/**
 * Admin dashboard regression tests — focuses on the mobile/tablet responsive
 * navigation work: a swipeable horizontal section strip below `md`, a
 * compact vertical sidebar at `md`+, and an icon-only app bar on phones.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { SiteContentProvider, useSiteContent } from '../context/SiteContentContext';
import { AdminDashboard } from '../components/admin/AdminDashboard';

// Keep the provider's hydration effect and any API-dependent panels offline-safe.
vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline in tests')));

/** Mounts the dashboard the way the real site does once the admin is authed,
 *  forcing the panel open (production flow: login modal → panel). */
const DashboardHarness: React.FC = () => {
  const { openAdminPanel } = useSiteContent();
  React.useEffect(() => {
    openAdminPanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <AdminDashboard />;
};

const renderDashboard = () =>
  render(
    <SiteContentProvider>
      <DashboardHarness />
    </SiteContentProvider>,
  );

describe('AdminDashboard responsive navigation', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('renders the mobile horizontal section strip (hidden at md+)', () => {
    renderDashboard();
    const strip = screen.getByRole('navigation', { name: /dashboard sections/i });
    expect(strip).toBeInTheDocument();
    // On phones the strip is the primary nav…
    expect(strip.className).toContain('md:hidden');
    expect(strip.className).toContain('overflow-x-auto');
    // …while the vertical sidebar collapses (shown again from md up).
    const sidebar = document.querySelector('aside');
    expect(sidebar).not.toBeNull();
    expect(sidebar!.className).toContain('hidden');
    expect(sidebar!.className).toContain('md:flex');
    expect(sidebar!.className).toContain('md:w-48');
    expect(sidebar!.className).toContain('lg:w-64');
  });

  it('exposes every section as a tappable pill in the strip', () => {
    renderDashboard();
    const strip = screen.getByRole('navigation', { name: /dashboard sections/i });
    const labels = [
      'Wholesale Inquiries',
      'Colors & Fonts',
      'Header & Navigation',
      'Hero Section',
      'The JayCee Selection',
      'Featured Range Cards',
      'Editorial Stories',
      'Everyday Essentials',
      'Company Story & Pillars',
      'Location & Directions',
      'FAQs Accordion',
      'Culinary Photo Ribbon',
      /Custom Sections/,
      'Footer & Copyright',
    ];
    for (const label of labels) {
      const pills = screen
        .getAllByText(label)
        .filter((el) => strip.contains(el));
      expect(pills.length).toBeGreaterThan(0);
    }
  });

  it('switches the active panel from a strip pill and marks it active', () => {
    renderDashboard();
    const strip = screen.getByRole('navigation', { name: /dashboard sections/i });
    expect(
      screen.getByRole('heading', { level: 2, name: /color palette & fonts/i }),
    ).toBeInTheDocument();

    const heroPill = screen.getAllByText('Hero Section').find((el) => strip.contains(el));
    fireEvent.click(heroPill!);

    expect(
      screen.getByRole('heading', { level: 2, name: /^hero section$/i }),
    ).toBeInTheDocument();
    expect(heroPill?.closest('button')).toHaveAttribute('data-active', 'true');
  });

  it('keeps app-bar actions reachable with icons + accessible labels on phones', () => {
    renderDashboard();
    // Labels collapse (hidden sm:inline) but the actions stay icon-tappable.
    expect(
      screen.getByRole('button', { name: /reset to factory defaults/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /preview the live site/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log out from backoffice/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close admin panel/i })).toBeInTheDocument();
  });
});
