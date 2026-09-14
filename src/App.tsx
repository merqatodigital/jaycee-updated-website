import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySelection } from './components/CategorySelection';
import { FeaturedRanges } from './components/FeaturedRanges';
import { PartnerLogos } from './components/PartnerLogos';
import { EditorialStory } from './components/EditorialStory';
import { EssentialsGrid } from './components/EssentialsGrid';
import { CompanyStory } from './components/CompanyStory';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { OnlineStoreBanner } from './components/OnlineStoreBanner';
import { FoodRibbon } from './components/FoodRibbon';
import { PreFooterCTA } from './components/PreFooterCTA';
import { Footer } from './components/Footer';
import { WholesaleModal } from './components/WholesaleModal';
import { InteractiveMapModal } from './components/InteractiveMapModal';
import { CategoryDetailModal } from './components/CategoryDetailModal';
import { BackToTop } from './components/BackToTop';
import { CustomSectionsRenderer } from './components/CustomSectionsRenderer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import type { CategoryItem } from './types/siteContent';

function MainSite() {
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const { isLoginModalOpen, isAdminPanelOpen } = useSiteContent();

  const handleOpenWholesale = () => {
    setWholesaleModalOpen(true);
  };

  const handleOpenMap = () => {
    setMapModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#121110] text-[#1C1917] dark:text-[#F5F5F4] font-sans antialiased selection:bg-[#991B1B] selection:text-white flex flex-col justify-between transition-colors duration-200">
      {/* 1. Top Utility Bar */}
      <TopBar />

      {/* 2. Main Navigation Header (Triple click logo to login) */}
      <Navbar onOpenWholesale={handleOpenWholesale} />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero onWholesaleEnquiry={handleOpenWholesale} />

        {/* 4. The JayCee Selection Carousel / Grid */}
        <CategorySelection onSelectCategory={(cat) => setSelectedCategory(cat)} />

        {/* 5. 3 Large Featured Range Cards */}
        <FeaturedRanges />

        {/* 6. Partner Brands / Social Proof ("IN GOOD COMPANY") */}
        <PartnerLogos />

        {/* 7. Staggered Editorial Story ("FROM OUR SHELVES TO YOUR KITCHEN") */}
        <EditorialStory onOpenWholesale={handleOpenWholesale} />

        {/* Custom Dynamic Sections Added via Admin Backoffice */}
        <CustomSectionsRenderer />

        {/* 8. The Everyday Essentials 3-Card Grid */}
        <EssentialsGrid />

        {/* 9. Locally Rooted 2017 & Company Pillars */}
        <CompanyStory />

        {/* 10. Our New Location & Map Callout Banner */}
        <LocationSection onOpenMapModal={handleOpenMap} />

        {/* 11. FAQ Accordion ("A LITTLE LOCAL KNOWLEDGE") */}
        <FAQSection />

        {/* 12. Online Store CTA Banner ("Looking for something specific?") */}
        <OnlineStoreBanner />

        {/* 13. Edge-to-edge 6-photo Culinary Ribbon */}
        <FoodRibbon />

        {/* 14. Pre-Footer Callout ("Let's keep your kitchen supplied.") */}
        <PreFooterCTA />
      </main>

      {/* 15. Comprehensive Footer */}
      <Footer onOpenWholesale={handleOpenWholesale} />

      {/* Interactive Modals */}
      <WholesaleModal
        isOpen={wholesaleModalOpen}
        onClose={() => setWholesaleModalOpen(false)}
      />

      <InteractiveMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
      />

      {selectedCategory && (
        <CategoryDetailModal
          category={selectedCategory as any}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      {/* Admin Backoffice Modals */}
      {isLoginModalOpen && <AdminLoginModal />}
      {isAdminPanelOpen && <AdminDashboard />}

      {/* Floating Back to Top button */}
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <MainSite />
    </SiteContentProvider>
  );
}
