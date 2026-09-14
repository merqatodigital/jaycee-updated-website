import React, { useEffect, useRef, useState } from 'react';
import {
  Palette,
  Layout,
  Type,
  Image,
  Layers,
  Sparkles,
  HelpCircle,
  MapPin,
  Footprints,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  X,
  Check,
  Eye,
  LogOut,
  ExternalLink,
  Inbox,
} from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { ImageUploadField } from './ImageUploadField';
import { InquiriesPanel } from './InquiriesPanel';
import type {
  CategoryItem,
  FeaturedRangeItem,
  EditorialStoryItem,
  EssentialItem,
  FaqConfigItem,
  CustomSectionItem,
} from '../../types/siteContent';

type AdminTab =
  | 'theme'
  | 'header'
  | 'hero'
  | 'categories'
  | 'featured'
  | 'stories'
  | 'essentials'
  | 'company'
  | 'location'
  | 'faqs'
  | 'ribbon'
  | 'customSections'
  | 'footer'
  | 'inquiries';

type TabIcon = React.ComponentType<{ className?: string }>;

interface AdminTabDef {
  id: AdminTab;
  label: string;
  icon: TabIcon;
  iconClass: string;
}

/** Single source of truth for the section nav — rendered as a vertical
 *  sidebar on tablet/desktop and a horizontal swipeable strip on phones. */
const ADMIN_TAB_GROUPS: { label: string; tabs: AdminTabDef[] }[] = [
  {
    label: 'Operations',
    tabs: [
      { id: 'inquiries', label: 'Wholesale Inquiries', icon: Inbox, iconClass: 'text-emerald-600' },
    ],
  },
  {
    label: 'Design & Global',
    tabs: [
      { id: 'theme', label: 'Colors & Fonts', icon: Palette, iconClass: 'text-amber-500' },
      { id: 'header', label: 'Header & Navigation', icon: Layout, iconClass: 'text-blue-500' },
      { id: 'hero', label: 'Hero Section', icon: Sparkles, iconClass: 'text-rose-500' },
    ],
  },
  {
    label: 'Sections & Content',
    tabs: [
      { id: 'categories', label: 'The JayCee Selection', icon: Layers, iconClass: 'text-emerald-600' },
      { id: 'featured', label: 'Featured Range Cards', icon: Image, iconClass: 'text-purple-600' },
      { id: 'stories', label: 'Editorial Stories', icon: Type, iconClass: 'text-indigo-600' },
      { id: 'essentials', label: 'Everyday Essentials', icon: Layers, iconClass: 'text-teal-600' },
      { id: 'company', label: 'Company Story & Pillars', icon: Sparkles, iconClass: 'text-amber-600' },
      { id: 'location', label: 'Location & Directions', icon: MapPin, iconClass: 'text-rose-600' },
      { id: 'faqs', label: 'FAQs Accordion', icon: HelpCircle, iconClass: 'text-sky-600' },
      { id: 'ribbon', label: 'Culinary Photo Ribbon', icon: Image, iconClass: 'text-pink-600' },
    ],
  },
  {
    label: 'Extension & Footer',
    tabs: [
      { id: 'customSections', label: 'Custom Sections', icon: Plus, iconClass: 'text-emerald-500' },
      { id: 'footer', label: 'Footer & Copyright', icon: Footprints, iconClass: 'text-stone-600' },
    ],
  },
];

export const AdminDashboard: React.FC = () => {
  const {
    content,
    updateContent,
    resetToDefault,
    isAdminPanelOpen,
    closeAdminPanel,
    logoutAdmin,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('theme');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const tabStripRef = useRef<HTMLElement | null>(null);

  // Keep the active pill centered in the mobile/tablet-portrait tab strip.
  useEffect(() => {
    const strip = tabStripRef.current;
    if (!strip) return;
    const activeEl = strip.querySelector('[data-active="true"]');
    if (activeEl && typeof activeEl.scrollIntoView === 'function') {
      activeEl.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  if (!isAdminPanelOpen) return null;

  const displayLabel = (tab: AdminTabDef) =>
    tab.id === 'customSections' ? `Custom Sections (${content.customSections.length})` : tab.label;

  const handleSaveNotify = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetConfirm = () => {
    if (confirm('Are you sure you want to reset all site customizations back to default?')) {
      resetToDefault();
      handleSaveNotify();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full h-full flex flex-col bg-white overflow-hidden shadow-2xl">
        {/* Top App Bar */}
        <header className="bg-[#1C1917] text-white px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between gap-2 border-b border-stone-800 shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <h1 className="text-sm sm:text-lg font-serif tracking-tight font-medium text-white flex items-center gap-2 min-w-0">
              <span className="truncate">JayCee Backoffice</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-sans tracking-widest bg-stone-800 px-2 py-0.5 rounded text-amber-400 font-semibold border border-stone-700 shrink-0">
                Live Admin Mode
              </span>
            </h1>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3 shrink-0">
            {saveSuccess && (
              <span
                className="inline-flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-950/60 px-2 sm:px-2.5 py-1 rounded border border-emerald-800"
                title="Changes saved"
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Changes saved</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetConfirm}
              className="inline-flex items-center justify-center space-x-1.5 p-2 sm:px-3 sm:py-1.5 rounded text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              title="Reset to factory defaults"
              aria-label="Reset to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Default</span>
            </button>

            <button
              type="button"
              onClick={closeAdminPanel}
              className="inline-flex items-center justify-center space-x-1.5 p-2 sm:px-3.5 sm:py-1.5 bg-[#8B1D24] hover:bg-[#74151B] text-white rounded text-xs font-medium transition-all shadow"
              title="Preview the live site"
              aria-label="Preview the live site"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Site</span>
            </button>

            <button
              type="button"
              onClick={logoutAdmin}
              className="p-2 sm:p-1.5 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded transition-colors"
              title="Log out from Backoffice"
              aria-label="Log out from Backoffice"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={closeAdminPanel}
              className="p-2 sm:p-1 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
              aria-label="Close admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Horizontal section switcher — phones & portrait tablets */}
        <nav
          ref={tabStripRef}
          aria-label="Dashboard sections"
          className="md:hidden shrink-0 overflow-x-auto overscroll-x-contain bg-stone-100 border-b border-stone-200"
        >
          <div className="flex items-center gap-1.5 w-max px-3 py-2">
            {ADMIN_TAB_GROUPS.map((group) => (
              <React.Fragment key={group.label}>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400 whitespace-nowrap pl-1" aria-hidden="true">
                  {group.label}
                </span>
                {group.tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      data-active={isActive || undefined}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
                        isActive
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : tab.iconClass}`} />
                      <span>{displayLabel(tab)}</span>
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </nav>

        {/* Workspace Body: Sidebar Tabs + Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation Sidebar — tablet & desktop */}
          <aside className="hidden md:flex md:flex-col md:w-48 lg:w-64 bg-stone-50 border-r border-stone-200 overflow-y-auto shrink-0 p-2 lg:p-3">
            <div className="space-y-1 pb-2">
              {ADMIN_TAB_GROUPS.map((group) => (
                <React.Fragment key={group.label}>
                  <div className="px-3 pt-4 pb-1 first:pt-1 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                    {group.label}
                  </div>
                  {group.tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-[11px] lg:text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-stone-900 text-white shadow-xs'
                            : 'text-stone-700 hover:bg-stone-200/70'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${tab.iconClass}`} />
                        <span className="truncate">{displayLabel(tab)}</span>
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </aside>

          {/* Right Main Form Panel */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 bg-stone-100/60">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {/* Operations: Wholesale Inquiries (Neon-backed) */}
              {activeTab === 'inquiries' && <InquiriesPanel />}

              {/* TAB 1: Theme & Color Palette & Fonts */}
              {activeTab === 'theme' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif text-stone-900">Color Palette & Fonts</h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Customize your brand colors, primary action buttons, and typography pairing. Changes take effect immediately.
                    </p>
                  </div>

                  {/* Colors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Primary Brand Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={content.theme.primaryColor}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, primaryColor: e.target.value },
                            }))
                          }
                          className="w-10 h-10 rounded border border-stone-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={content.theme.primaryColor}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, primaryColor: e.target.value },
                            }))
                          }
                          className="flex-1 text-xs font-mono px-3 py-2 border border-stone-300 rounded-md"
                        />
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 block">Used for main buttons and tags</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Primary Hover State
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={content.theme.primaryHoverColor}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, primaryHoverColor: e.target.value },
                            }))
                          }
                          className="w-10 h-10 rounded border border-stone-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={content.theme.primaryHoverColor}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, primaryHoverColor: e.target.value },
                            }))
                          }
                          className="flex-1 text-xs font-mono px-3 py-2 border border-stone-300 rounded-md"
                        />
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 block">Button hover accent</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Highlight Accent Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={content.theme.accentColor}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, accentColor: e.target.value },
                            }))
                          }
                          className="w-10 h-10 rounded border border-stone-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={content.theme.accentColor}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, accentColor: e.target.value },
                            }))
                          }
                          className="flex-1 text-xs font-mono px-3 py-2 border border-stone-300 rounded-md"
                        />
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 block">Highlights, icons, selection</span>
                    </div>
                  </div>

                  {/* Fonts */}
                  <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Heading Font Style
                      </label>
                      <select
                        value={content.theme.fontFamilyHeading}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            theme: {
                              ...prev.theme,
                              fontFamilyHeading: e.target.value as any,
                            },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md bg-white"
                      >
                        <option value="Cormorant Garamond">Cormorant Garamond (Editorial Serif - Default)</option>
                        <option value="Playfair Display">Playfair Display (Luxury High-Contrast)</option>
                        <option value="Cinzel">Cinzel (Classical Engraved)</option>
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Geometric Clean)</option>
                        <option value="System Serif">Classic Georgia Serif</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Body Font Style
                      </label>
                      <select
                        value={content.theme.fontFamilyBody}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            theme: {
                              ...prev.theme,
                              fontFamilyBody: e.target.value as any,
                            },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md bg-white"
                      >
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Crisp Modern - Default)</option>
                        <option value="Inter">Inter (Ultra-Neutral Modern)</option>
                        <option value="Roboto">Roboto (Clean Sans)</option>
                        <option value="System Sans">System Native Sans</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview swatch */}
                  <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="text-xs text-stone-500 block">Current Button Preview:</span>
                      <button
                        style={{
                          backgroundColor: content.theme.primaryColor,
                          color: '#FFFFFF',
                        }}
                        className="mt-1 px-4 py-2 rounded text-xs font-medium shadow-xs"
                      >
                        Explore Products Example
                      </button>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-xs text-stone-500 block">Typography Preview:</span>
                      <h4
                        className="text-lg"
                        style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                      >
                        Quality Food. Reliable Supply.
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Header & Navigation */}
              {activeTab === 'header' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif text-stone-900">Header & Navigation Bar</h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Edit the top utility banner, telephone links, online store CTA, and navigation links.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Top Bar Location Badge
                      </label>
                      <input
                        type="text"
                        value={content.header.topBarText}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            header: { ...prev.header, topBarText: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Top Bar Center Motto
                      </label>
                      <input
                        type="text"
                        value={content.header.topBarMotto}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            header: { ...prev.header, topBarMotto: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Display Phone Number
                      </label>
                      <input
                        type="text"
                        value={content.header.phone}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            header: { ...prev.header, phone: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Order Online CTA URL
                      </label>
                      <input
                        type="text"
                        value={content.header.orderOnlineUrl}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            header: { ...prev.header, orderOnlineUrl: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>
                  </div>

                  {/* Nav Links */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                        Navigation Menu Items
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          updateContent((prev) => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              navLinks: [
                                ...(prev.header?.navLinks || []),
                                {
                                  id: `nav-${Date.now()}`,
                                  label: 'New Link',
                                  href: '#',
                                },
                              ],
                            },
                          }))
                        }
                        className="inline-flex items-center space-x-1 text-xs text-[#8B1D24] font-medium hover:underline cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Nav Item</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(content.header?.navLinks || []).map((link, idx) => (
                        <div
                          key={link.id}
                          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-2 bg-stone-50 p-2 rounded-lg border border-stone-200"
                        >
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...(content.header?.navLinks || [])];
                              newLinks[idx].label = e.target.value;
                              updateContent((prev) => ({
                                ...prev,
                                header: { ...prev.header, navLinks: newLinks },
                              }));
                            }}
                            placeholder="Label"
                            className="w-full sm:w-1/3 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                          />
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...(content.header?.navLinks || [])];
                              newLinks[idx].href = e.target.value;
                              updateContent((prev) => ({
                                ...prev,
                                header: { ...prev.header, navLinks: newLinks },
                              }));
                            }}
                            placeholder="#section-id or https://..."
                            className="flex-1 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newLinks = (content.header?.navLinks || []).filter((_, i) => i !== idx);
                              updateContent((prev) => ({
                                ...prev,
                                header: { ...prev.header, navLinks: newLinks },
                              }));
                            }}
                            className="p-2 sm:p-1 self-end sm:self-auto text-stone-400 hover:text-red-600 rounded transition-colors"
                            title="Delete link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Hero Section */}
              {activeTab === 'hero' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif text-stone-900">Hero Section</h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Customize the hero badge, headline, subtext, call-to-action buttons, and background photography.
                    </p>
                  </div>

                  <ImageUploadField
                    label="Hero Background Image"
                    value={content.hero.bgImageUrl}
                    onChange={(url) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, bgImageUrl: url },
                      }))
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Eyebrow Badge
                      </label>
                      <input
                        type="text"
                        value={content.hero.eyebrow}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, eyebrow: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Headline Line 1
                      </label>
                      <input
                        type="text"
                        value={content.hero.headlinePart1}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, headlinePart1: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Headline Line 2
                      </label>
                      <input
                        type="text"
                        value={content.hero.headlinePart2}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, headlinePart2: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Italic Highlight Line
                      </label>
                      <input
                        type="text"
                        value={content.hero.headlineItalic}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, headlineItalic: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-serif italic text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Subtext Narrative
                      </label>
                      <textarea
                        rows={3}
                        value={content.hero.subtext}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, subtext: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Primary Button Label
                      </label>
                      <input
                        type="text"
                        value={content.hero.exploreBtnText}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, exploreBtnText: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Secondary Button Label
                      </label>
                      <input
                        type="text"
                        value={content.hero.wholesaleBtnText}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, wholesaleBtnText: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Status Bar Left Text
                      </label>
                      <input
                        type="text"
                        value={content.hero.statusBarLeft}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, statusBarLeft: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Status Bar Right Text
                      </label>
                      <input
                        type="text"
                        value={content.hero.statusBarRight}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, statusBarRight: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: The JayCee Selection Categories */}
              {activeTab === 'categories' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif text-stone-900">The JayCee Selection Carousel</h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Add, edit, reorder or remove product categories displayed in the carousel.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newCat: CategoryItem = {
                          id: `cat-${Date.now()}`,
                          name: 'New Category',
                          subTitle: 'Premium specialty selection',
                          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
                        };
                        updateContent((prev) => ({
                          ...prev,
                          categories: [...prev.categories, newCat],
                        }));
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#8B1D24] text-white rounded text-xs font-medium cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Category</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {content.categories.map((cat, idx) => (
                      <div
                        key={cat.id}
                        className="border border-stone-200 rounded-lg p-4 bg-stone-50 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-700">Category #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = content.categories.filter((_, i) => i !== idx);
                              updateContent((prev) => ({ ...prev, categories: updated }));
                            }}
                            className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Category Name
                            </label>
                            <input
                              type="text"
                              value={cat.name}
                              onChange={(e) => {
                                const copy = [...content.categories];
                                copy[idx].name = e.target.value;
                                updateContent((prev) => ({ ...prev, categories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Subtitle / Spec
                            </label>
                            <input
                              type="text"
                              value={cat.subTitle}
                              onChange={(e) => {
                                const copy = [...content.categories];
                                copy[idx].subTitle = e.target.value;
                                updateContent((prev) => ({ ...prev, categories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>
                        </div>

                        <ImageUploadField
                          label="Category Image"
                          value={cat.image}
                          onChange={(url) => {
                            const copy = [...content.categories];
                            copy[idx].image = url;
                            updateContent((prev) => ({ ...prev, categories: copy }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Featured Range Cards */}
              {activeTab === 'featured' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif text-stone-900">Featured Range Cards (3 Columns)</h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Edit the badges, titles, images, and links on the 3 primary showcase cards.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newCard: FeaturedRangeItem = {
                          id: `featured-${Date.now()}`,
                          badge: 'NEW ARRIVAL',
                          title: 'Specialty Selection',
                          subtitle: 'Direct from suppliers',
                          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
                          linkText: 'Explore range',
                        };
                        updateContent((prev) => ({
                          ...prev,
                          featuredRanges: [...prev.featuredRanges, newCard],
                        }));
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#8B1D24] text-white rounded text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {content.featuredRanges.map((item, idx) => (
                      <div
                        key={item.id}
                        className="border border-stone-200 rounded-lg p-4 bg-stone-50 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-700">Card #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = content.featuredRanges.filter((_, i) => i !== idx);
                              updateContent((prev) => ({ ...prev, featuredRanges: copy }));
                            }}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Badge
                            </label>
                            <input
                              type="text"
                              value={item.badge}
                              onChange={(e) => {
                                const copy = [...content.featuredRanges];
                                copy[idx].badge = e.target.value;
                                updateContent((prev) => ({ ...prev, featuredRanges: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white font-mono uppercase"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const copy = [...content.featuredRanges];
                                copy[idx].title = e.target.value;
                                updateContent((prev) => ({ ...prev, featuredRanges: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Link Text
                            </label>
                            <input
                              type="text"
                              value={item.linkText}
                              onChange={(e) => {
                                const copy = [...content.featuredRanges];
                                copy[idx].linkText = e.target.value;
                                updateContent((prev) => ({ ...prev, featuredRanges: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>
                        </div>

                        <ImageUploadField
                          label="Card Background Image"
                          value={item.image}
                          onChange={(url) => {
                            const copy = [...content.featuredRanges];
                            copy[idx].image = url;
                            updateContent((prev) => ({ ...prev, featuredRanges: copy }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Editorial Stories */}
              {activeTab === 'stories' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif text-stone-900">Editorial Stories ("From Our Shelves...")</h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Edit each staggered narrative story row with images from your device.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newStory: EditorialStoryItem = {
                          id: `story-${Date.now()}`,
                          stepNumber: `0${content.editorialStories.length + 1} / SPECIALTY`,
                          title: 'Specialty Story',
                          headline: 'Custom curated.\nFor every chef.',
                          description: 'Tell your story about local sourcing, partnerships, or specialty items.',
                          ctaText: 'Explore more',
                          ctaType: 'link',
                          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
                          imageOnRight: content.editorialStories.length % 2 === 1,
                        };
                        updateContent((prev) => ({
                          ...prev,
                          editorialStories: [...prev.editorialStories, newStory],
                        }));
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#8B1D24] text-white rounded text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Story Row</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {content.editorialStories.map((story, idx) => (
                      <div
                        key={story.id}
                        className="border border-stone-200 rounded-lg p-4 sm:p-5 bg-stone-50 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-800">
                            Story Row #{idx + 1}: {story.stepNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = content.editorialStories.filter((_, i) => i !== idx);
                              updateContent((prev) => ({ ...prev, editorialStories: copy }));
                            }}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Step Eyebrow
                            </label>
                            <input
                              type="text"
                              value={story.stepNumber}
                              onChange={(e) => {
                                const copy = [...content.editorialStories];
                                copy[idx].stepNumber = e.target.value;
                                updateContent((prev) => ({ ...prev, editorialStories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Image Alignment
                            </label>
                            <select
                              value={story.imageOnRight ? 'right' : 'left'}
                              onChange={(e) => {
                                const copy = [...content.editorialStories];
                                copy[idx].imageOnRight = e.target.value === 'right';
                                updateContent((prev) => ({ ...prev, editorialStories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            >
                              <option value="left">Image on Left, Text on Right</option>
                              <option value="right">Text on Left, Image on Right</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Headline (use newline for line break)
                            </label>
                            <textarea
                              rows={2}
                              value={story.headline}
                              onChange={(e) => {
                                const copy = [...content.editorialStories];
                                copy[idx].headline = e.target.value;
                                updateContent((prev) => ({ ...prev, editorialStories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white font-serif text-sm"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Description Paragraph
                            </label>
                            <textarea
                              rows={3}
                              value={story.description}
                              onChange={(e) => {
                                const copy = [...content.editorialStories];
                                copy[idx].description = e.target.value;
                                updateContent((prev) => ({ ...prev, editorialStories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              CTA Button Label
                            </label>
                            <input
                              type="text"
                              value={story.ctaText}
                              onChange={(e) => {
                                const copy = [...content.editorialStories];
                                copy[idx].ctaText = e.target.value;
                                updateContent((prev) => ({ ...prev, editorialStories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Action Type
                            </label>
                            <select
                              value={story.ctaType}
                              onChange={(e) => {
                                const copy = [...content.editorialStories];
                                copy[idx].ctaType = e.target.value as any;
                                updateContent((prev) => ({ ...prev, editorialStories: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            >
                              <option value="link">Open Online Store</option>
                              <option value="wholesale">Open Wholesale Modal</option>
                              <option value="phone">Direct Call Phone</option>
                            </select>
                          </div>
                        </div>

                        <ImageUploadField
                          label="Editorial Row Image"
                          value={story.image}
                          onChange={(url) => {
                            const copy = [...content.editorialStories];
                            copy[idx].image = url;
                            updateContent((prev) => ({ ...prev, editorialStories: copy }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: Everyday Essentials */}
              {activeTab === 'essentials' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif text-stone-900">Everyday Essentials Grid</h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Edit titles, descriptions, and uploaded images for the 3 essentials cards.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newEss: EssentialItem = {
                          id: `ess-${Date.now()}`,
                          title: 'New Essential',
                          subTitle: 'Premium selection',
                          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
                        };
                        updateContent((prev) => ({
                          ...prev,
                          essentials: [...prev.essentials, newEss],
                        }));
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#8B1D24] text-white rounded text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Essential</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {content.essentials.map((item, idx) => (
                      <div
                        key={item.id}
                        className="border border-stone-200 rounded-lg p-4 bg-stone-50 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-700">Essential #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = content.essentials.filter((_, i) => i !== idx);
                              updateContent((prev) => ({ ...prev, essentials: copy }));
                            }}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const copy = [...content.essentials];
                                copy[idx].title = e.target.value;
                                updateContent((prev) => ({ ...prev, essentials: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">
                              Subtitle
                            </label>
                            <input
                              type="text"
                              value={item.subTitle}
                              onChange={(e) => {
                                const copy = [...content.essentials];
                                copy[idx].subTitle = e.target.value;
                                updateContent((prev) => ({ ...prev, essentials: copy }));
                              }}
                              className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                            />
                          </div>
                        </div>

                        <ImageUploadField
                          label="Image"
                          value={item.image}
                          onChange={(url) => {
                            const copy = [...content.essentials];
                            copy[idx].image = url;
                            updateContent((prev) => ({ ...prev, essentials: copy }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: Company Story & Pillars */}
              {activeTab === 'company' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif text-stone-900">Locally Rooted & Company Pillars</h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Edit the narrative, founding year callout, and 4 feature pillars.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Eyebrow Badge
                      </label>
                      <input
                        type="text"
                        value={content.companyStory.eyebrow}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            companyStory: { ...prev.companyStory, eyebrow: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Year Callout
                      </label>
                      <input
                        type="text"
                        value={content.companyStory.year}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            companyStory: { ...prev.companyStory, year: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-serif text-base"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Story Headline
                      </label>
                      <textarea
                        rows={2}
                        value={content.companyStory.title}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            companyStory: { ...prev.companyStory, title: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-serif text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Main Story Narrative
                      </label>
                      <textarea
                        rows={4}
                        value={content.companyStory.paragraph}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            companyStory: { ...prev.companyStory, paragraph: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tagline Accent
                      </label>
                      <input
                        type="text"
                        value={content.companyStory.tagline}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            companyStory: { ...prev.companyStory, tagline: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-serif italic text-sm"
                      />
                    </div>
                  </div>

                  {/* Pillars list */}
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      Company Pillars ({content.companyStory.pillars.length})
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {content.companyStory.pillars.map((pillar, idx) => (
                        <div
                          key={pillar.id}
                          className="border border-stone-200 rounded-lg p-3 bg-stone-50 space-y-2"
                        >
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const copy = [...content.companyStory.pillars];
                              copy[idx].title = e.target.value;
                              updateContent((prev) => ({
                                ...prev,
                                companyStory: { ...prev.companyStory, pillars: copy },
                              }));
                            }}
                            className="w-full text-xs font-semibold px-2 py-1 border border-stone-300 rounded bg-white"
                          />
                          <input
                            type="text"
                            value={pillar.description}
                            onChange={(e) => {
                              const copy = [...content.companyStory.pillars];
                              copy[idx].description = e.target.value;
                              updateContent((prev) => ({
                                ...prev,
                                companyStory: { ...prev.companyStory, pillars: copy },
                              }));
                            }}
                            className="w-full text-xs px-2 py-1 border border-stone-300 rounded bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: Location & Directions */}
              {activeTab === 'location' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif text-stone-900">Location & Storefront Details</h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Update your storefront address, travel distances, store hours, and storefront photo.
                    </p>
                  </div>

                  <ImageUploadField
                    label="Storefront Exterior Photo"
                    value={content.location.storefrontImage}
                    onChange={(url) =>
                      updateContent((prev) => ({
                        ...prev,
                        location: { ...prev.location, storefrontImage: url },
                      }))
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Store Address
                      </label>
                      <input
                        type="text"
                        value={content.location.address}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            location: { ...prev.location, address: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Store Hours
                      </label>
                      <input
                        type="text"
                        value={content.location.storeHours}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            location: { ...prev.location, storeHours: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Pickup & Delivery Note
                      </label>
                      <input
                        type="text"
                        value={content.location.pickupInfo}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            location: { ...prev.location, pickupInfo: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nearby Landmarks
                      </label>
                      <input
                        type="text"
                        value={content.location.nearbyLandmarks}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            location: { ...prev.location, nearbyLandmarks: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 10: FAQs */}
              {activeTab === 'faqs' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif text-stone-900">Frequently Asked Questions</h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Manage Q&A items displayed in the interactive accordion.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newFaq: FaqConfigItem = {
                          id: `faq-${Date.now()}`,
                          question: 'New Question?',
                          answer: 'Provide clear, concise answer here.',
                        };
                        updateContent((prev) => ({
                          ...prev,
                          faqs: [...prev.faqs, newFaq],
                        }));
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#8B1D24] text-white rounded text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {content.faqs.map((faq, idx) => (
                      <div
                        key={faq.id}
                        className="border border-stone-200 rounded-lg p-4 bg-stone-50 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-700">FAQ #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = content.faqs.filter((_, i) => i !== idx);
                              updateContent((prev) => ({ ...prev, faqs: copy }));
                            }}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-stone-600 mb-1">
                            Question
                          </label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const copy = [...content.faqs];
                              copy[idx].question = e.target.value;
                              updateContent((prev) => ({ ...prev, faqs: copy }));
                            }}
                            className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-stone-600 mb-1">
                            Answer
                          </label>
                          <textarea
                            rows={3}
                            value={faq.answer}
                            onChange={(e) => {
                              const copy = [...content.faqs];
                              copy[idx].answer = e.target.value;
                              updateContent((prev) => ({ ...prev, faqs: copy }));
                            }}
                            className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 11: Photo Ribbon */}
              {activeTab === 'ribbon' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif text-stone-900">Culinary Photo Ribbon</h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Update the edge-to-edge culinary gallery photos from your device or via URL.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateContent((prev) => ({
                          ...prev,
                          ribbonImages: [
                            ...prev.ribbonImages,
                            {
                              id: `ribbon-${Date.now()}`,
                              url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
                              alt: 'Culinary dish preview',
                            },
                          ],
                        }));
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#8B1D24] text-white rounded text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Ribbon Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.ribbonImages.map((img, idx) => (
                      <div
                        key={img.id}
                        className="border border-stone-200 rounded-lg p-3 bg-stone-50 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-700">Photo #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = content.ribbonImages.filter((_, i) => i !== idx);
                              updateContent((prev) => ({ ...prev, ribbonImages: copy }));
                            }}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <ImageUploadField
                          label="Image File"
                          value={img.url}
                          onChange={(url) => {
                            const copy = [...content.ribbonImages];
                            copy[idx].url = url;
                            updateContent((prev) => ({ ...prev, ribbonImages: copy }));
                          }}
                        />

                        <input
                          type="text"
                          value={img.alt}
                          placeholder="Alt tag / description"
                          onChange={(e) => {
                            const copy = [...content.ribbonImages];
                            copy[idx].alt = e.target.value;
                            updateContent((prev) => ({ ...prev, ribbonImages: copy }));
                          }}
                          className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 12: Add Custom Sections */}
              {activeTab === 'customSections' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif text-stone-900">Add & Manage Custom Sections</h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Add brand-new sections to the page with custom headings, text, device images, and action buttons.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newSection: CustomSectionItem = {
                          id: `section-${Date.now()}`,
                          enabled: true,
                          title: 'Special Announcement or Seasonal Showcase',
                          subtitle: 'Fresh arrivals and seasonal imports',
                          eyebrow: 'FEATURED SPOTLIGHT',
                          content:
                            'Introduce upcoming deliveries, special product tastings, or partner promotions directly here.',
                          imageUrl:
                            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
                          imagePosition: 'right',
                          ctaText: 'Learn More',
                          ctaUrl: '#',
                        };
                        updateContent((prev) => ({
                          ...prev,
                          customSections: [...prev.customSections, newSection],
                        }));
                      }}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#8B1D24] text-white rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Section</span>
                    </button>
                  </div>

                  {content.customSections.length === 0 ? (
                    <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
                      <Layers className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                      <h4 className="text-sm font-semibold text-stone-700">No custom sections added yet</h4>
                      <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
                        Click "Create New Section" above to add dynamic custom promo blocks, photo showcases, or testimonials anywhere on your site.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {content.customSections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="border border-stone-200 rounded-xl p-4 sm:p-5 bg-stone-50 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-stone-800">
                                Section #{idx + 1}: {sec.title || 'Untitled'}
                              </span>
                              <label className="inline-flex items-center space-x-1 text-[11px] text-stone-600">
                                <input
                                  type="checkbox"
                                  checked={sec.enabled}
                                  onChange={(e) => {
                                    const copy = [...content.customSections];
                                    copy[idx].enabled = e.target.checked;
                                    updateContent((prev) => ({ ...prev, customSections: copy }));
                                  }}
                                  className="rounded text-red-800"
                                />
                                <span>Visible on site</span>
                              </label>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const copy = content.customSections.filter((_, i) => i !== idx);
                                updateContent((prev) => ({ ...prev, customSections: copy }));
                              }}
                              className="text-stone-400 hover:text-red-600 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                Eyebrow Tag
                              </label>
                              <input
                                type="text"
                                value={sec.eyebrow || ''}
                                onChange={(e) => {
                                  const copy = [...content.customSections];
                                  copy[idx].eyebrow = e.target.value;
                                  updateContent((prev) => ({ ...prev, customSections: copy }));
                                }}
                                className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white font-mono uppercase"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                Section Title
                              </label>
                              <input
                                type="text"
                                value={sec.title}
                                onChange={(e) => {
                                  const copy = [...content.customSections];
                                  copy[idx].title = e.target.value;
                                  updateContent((prev) => ({ ...prev, customSections: copy }));
                                }}
                                className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white font-serif text-sm"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                Content Description
                              </label>
                              <textarea
                                rows={3}
                                value={sec.content}
                                onChange={(e) => {
                                  const copy = [...content.customSections];
                                  copy[idx].content = e.target.value;
                                  updateContent((prev) => ({ ...prev, customSections: copy }));
                                }}
                                className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white leading-relaxed"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                CTA Button Label
                              </label>
                              <input
                                type="text"
                                value={sec.ctaText || ''}
                                onChange={(e) => {
                                  const copy = [...content.customSections];
                                  copy[idx].ctaText = e.target.value;
                                  updateContent((prev) => ({ ...prev, customSections: copy }));
                                }}
                                className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                CTA Link URL
                              </label>
                              <input
                                type="text"
                                value={sec.ctaUrl || ''}
                                onChange={(e) => {
                                  const copy = [...content.customSections];
                                  copy[idx].ctaUrl = e.target.value;
                                  updateContent((prev) => ({ ...prev, customSections: copy }));
                                }}
                                className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                                Image Position
                              </label>
                              <select
                                value={sec.imagePosition || 'right'}
                                onChange={(e) => {
                                  const copy = [...content.customSections];
                                  copy[idx].imagePosition = e.target.value as any;
                                  updateContent((prev) => ({ ...prev, customSections: copy }));
                                }}
                                className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded bg-white"
                              >
                                <option value="right">Image on Right</option>
                                <option value="left">Image on Left</option>
                                <option value="background">Background Image</option>
                              </select>
                            </div>
                          </div>

                          <ImageUploadField
                            label="Section Image (Upload from device or URL)"
                            value={sec.imageUrl || ''}
                            onChange={(url) => {
                              const copy = [...content.customSections];
                              copy[idx].imageUrl = url;
                              updateContent((prev) => ({ ...prev, customSections: copy }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 13: Footer */}
              {activeTab === 'footer' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif text-stone-900">Footer Details</h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Update contact details, social links, opening hours, and copyright statement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Footer Tagline
                      </label>
                      <textarea
                        rows={2}
                        value={content.footer?.tagline || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, tagline: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-serif text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={content.footer?.instagramHandle || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, instagramHandle: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Instagram Profile URL
                      </label>
                      <input
                        type="text"
                        value={content.footer?.instagramUrl || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, instagramUrl: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={content.footer?.email || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, email: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Store Address
                      </label>
                      <input
                        type="text"
                        value={content.footer?.address || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, address: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Weekday Hours
                      </label>
                      <input
                        type="text"
                        value={content.footer?.openingHoursWeekday || content.footer?.hours || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, openingHoursWeekday: e.target.value, hours: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Weekend Hours
                      </label>
                      <input
                        type="text"
                        value={content.footer?.openingHoursWeekend || content.footer?.closedDay || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, openingHoursWeekend: e.target.value, closedDay: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Copyright Statement
                      </label>
                      <input
                        type="text"
                        value={content.footer?.copyrightText || ''}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: { ...prev.footer, copyrightText: e.target.value },
                          }))
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Explore Navigation Links in Footer */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                        Footer Explore Links
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          updateContent((prev) => ({
                            ...prev,
                            footer: {
                              ...prev.footer,
                              exploreLinks: [
                                ...(prev.footer?.exploreLinks || []),
                                {
                                  id: `f-exp-${Date.now()}`,
                                  label: 'New Link',
                                  href: '#',
                                },
                              ],
                            },
                          }))
                        }
                        className="inline-flex items-center space-x-1 text-xs text-[#8B1D24] font-medium hover:underline cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Link</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(content.footer?.exploreLinks || []).map((link, idx) => (
                        <div
                          key={link.id}
                          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-2 bg-stone-50 p-2 rounded-lg border border-stone-200"
                        >
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...(content.footer?.exploreLinks || [])];
                              newLinks[idx].label = e.target.value;
                              updateContent((prev) => ({
                                ...prev,
                                footer: { ...prev.footer, exploreLinks: newLinks },
                              }));
                            }}
                            placeholder="Label"
                            className="w-full sm:w-1/3 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                          />
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...(content.footer?.exploreLinks || [])];
                              newLinks[idx].href = e.target.value;
                              updateContent((prev) => ({
                                ...prev,
                                footer: { ...prev.footer, exploreLinks: newLinks },
                              }));
                            }}
                            placeholder="#section or https://..."
                            className="flex-1 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newLinks = (content.footer?.exploreLinks || []).filter((_, i) => i !== idx);
                              updateContent((prev) => ({
                                ...prev,
                                footer: { ...prev.footer, exploreLinks: newLinks },
                              }));
                            }}
                            className="p-2 self-end sm:self-auto text-stone-400 hover:text-red-600 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
