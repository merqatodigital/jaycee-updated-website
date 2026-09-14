import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, X } from 'lucide-react';
import { useSiteContent, ADMIN_PASSKEY } from '../../context/SiteContentContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, loginAdmin } = useSiteContent();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await loginAdmin(passkey)) {
      setPasskey('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#1C1917] rounded-xl shadow-2xl border border-stone-200 dark:border-[#2E2B29] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Dark Red Accent */}
        <div className="bg-[#1C1917] dark:bg-[#141212] px-6 py-5 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B1D24] flex items-center justify-center text-white">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-wide">JayCee Backoffice</h3>
              <p className="text-[11px] text-stone-400">Content Management & Customizer</p>
            </div>
          </div>
          <button
            onClick={closeLoginModal}
            className="text-stone-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Enter Administrator Passkey
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                autoFocus
                placeholder="••••"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  setError(false);
                }}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#242120] text-stone-900 dark:text-white rounded-lg text-lg tracking-widest font-mono text-center focus:ring-2 focus:ring-[#8B1D24] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 p-2.5 rounded-md border border-red-200 dark:border-red-900/50 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Incorrect passkey. Please enter 5309 to unlock the backoffice.</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={closeLoginModal}
              className="w-1/2 py-2.5 px-4 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 px-4 bg-[#8B1D24] hover:bg-[#74151B] text-white text-xs font-medium rounded-lg shadow transition-all cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
