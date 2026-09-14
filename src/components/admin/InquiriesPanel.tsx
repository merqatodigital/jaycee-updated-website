import React, { useEffect, useState } from 'react';
import { RefreshCw, Inbox, Mail, Phone, Building2, AlertCircle } from 'lucide-react';
import { fetchInquiries, updateInquiryStatus } from '../../lib/api';
import type { WholesaleInquiry } from '../../types/database';

type Status = NonNullable<WholesaleInquiry['status']>;

const STATUS_META: Record<Status, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  fulfilled: {
    label: 'Fulfilled',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
};

const STATUS_ORDER: Status[] = ['pending', 'contacted', 'fulfilled'];

function formatDate(value?: string): string {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return value;
  }
}

export const InquiriesPanel: React.FC = () => {
  const [inquiries, setInquiries] = useState<WholesaleInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchInquiries();
      setInquiries(rows);
    } catch {
      setError(
        'Could not load inquiries. Make sure the API server is running and the Neon database is reachable.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleStatusChange = async (id: string | undefined, status: Status) => {
    if (!id) return;
    setUpdatingId(id);
    // optimistic update
    setInquiries((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    const ok = await updateInquiryStatus(id, status);
    if (!ok) {
      setError('Failed to update status. Reloading current data.');
      await load();
    }
    setUpdatingId(null);
  };

  const visible =
    filter === 'all' ? inquiries : inquiries.filter((q) => (q.status || 'pending') === filter);

  const counts = STATUS_ORDER.reduce<Record<string, number>>(
    (acc, s) => {
      acc[s] = inquiries.filter((q) => (q.status || 'pending') === s).length;
      return acc;
    },
    { all: inquiries.length },
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-serif text-stone-900 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-emerald-600" />
            Wholesale Inquiries
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Commercial enquiries submitted through the site, stored in Neon Postgres.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
            filter === 'all'
              ? 'bg-stone-900 text-white border-stone-900'
              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
          }`}
        >
          All ({counts.all})
        </button>
        {STATUS_ORDER.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              filter === s
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {STATUS_META[s].label} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* List */}
      {loading && inquiries.length === 0 ? (
        <div className="py-12 text-center text-sm text-stone-400">Loading inquiries…</div>
      ) : visible.length === 0 ? (
        <div className="py-12 text-center">
          <Inbox className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <p className="text-sm text-stone-500">No inquiries to show.</p>
          <p className="text-xs text-stone-400 mt-1">
            New wholesale enquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((q) => {
            const status = (q.status || 'pending') as Status;
            return (
              <div
                key={q.id}
                className="rounded-lg border border-stone-200 p-3 sm:p-4 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-stone-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-stone-400" />
                        {q.businessName}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_META[status].className}`}
                      >
                        {STATUS_META[status].label}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-stone-400">
                        {q.businessType}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-stone-600">{q.contactPerson}</div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                      <a
                        href={`mailto:${q.email}`}
                        className="inline-flex items-center gap-1 min-w-0 break-all hover:text-stone-800"
                      >
                        <Mail className="w-3 h-3" /> {q.email}
                      </a>
                      <a
                        href={`tel:${q.phone}`}
                        className="inline-flex items-center gap-1 min-w-0 break-all hover:text-stone-800"
                      >
                        <Phone className="w-3 h-3" /> {q.phone}
                      </a>
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-400 shrink-0">
                    {formatDate(q.created_at)}
                  </div>
                </div>

                {q.message && (
                  <p className="mt-3 text-xs text-stone-600 bg-stone-50 border border-stone-100 rounded p-2.5 whitespace-pre-wrap">
                    {q.message}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wide text-stone-400">
                    Set status:
                  </span>
                  {STATUS_ORDER.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={updatingId === q.id || status === s}
                      onClick={() => handleStatusChange(q.id, s)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors disabled:cursor-default ${
                        status === s
                          ? STATUS_META[s].className
                          : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {STATUS_META[s].label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
