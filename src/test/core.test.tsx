import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TopBar } from '../components/TopBar';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CategorySelection } from '../components/CategorySelection';
import { FAQSection } from '../components/FAQSection';
import { LocationSection } from '../components/LocationSection';
import { PreFooterCTA } from '../components/PreFooterCTA';
import { OnlineStoreBanner } from '../components/OnlineStoreBanner';
import { WholesaleModal } from '../components/WholesaleModal';
import { JayCeeLogo } from '../components/JayCeeLogo';
import { BackToTop } from '../components/BackToTop';
import { ORDER_ONLINE_URL, PHONE_NUMBER } from '../data/jayceeData';
import { SiteContentProvider } from '../context/SiteContentContext';

/** Renders a component inside SiteContentProvider, as App.tsx does in production. */
const renderUI = (ui: React.ReactElement) => render(<SiteContentProvider>{ui}</SiteContentProvider>);

describe('TopBar Component', () => {
  it('renders location and phone number correctly', () => {
    renderUI(<TopBar />);
    expect(screen.getByText(/Puerto Princesa, Palawan/i)).toBeInTheDocument();
    expect(screen.getByText(/Serving local kitchens since 2017/i)).toBeInTheDocument();
    expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
  });
});

describe('Navbar Component', () => {
  it('renders brand logo and core navigation links', () => {
    renderUI(<Navbar />);
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Wholesale')).toBeInTheDocument();
    expect(screen.getByText('Our story')).toBeInTheDocument();
    expect(screen.getByText('Delivery')).toBeInTheDocument();
    expect(screen.getByText('FAQs')).toBeInTheDocument();
  });

  it('links Order Online button directly to jaycee.palawancollective.com', () => {
    renderUI(<Navbar />);
    const orderButtons = screen.getAllByRole('link', { name: /order/i });
    const primaryOrderBtn = orderButtons.find(
      (btn) => btn.getAttribute('href') === ORDER_ONLINE_URL
    );
    expect(primaryOrderBtn).toBeDefined();
    expect(primaryOrderBtn?.getAttribute('href')).toBe('https://jaycee.palawancollective.com/');
  });
});

describe('Hero Component', () => {
  it('renders hero headlines and value proposition', () => {
    renderUI(<Hero />);
    expect(screen.getByText(/Quality food/i)).toBeInTheDocument();
    expect(screen.getByText(/Reliable supply/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivered across Palawan/i)).toBeInTheDocument();
  });

  it('triggers onWholesaleEnquiry when wholesale button is clicked', () => {
    const wholesaleMock = vi.fn();
    renderUI(<Hero onWholesaleEnquiry={wholesaleMock} />);
    const wholesaleBtn = screen.getByRole('button', { name: /wholesale enquiry/i });
    fireEvent.click(wholesaleBtn);
    expect(wholesaleMock).toHaveBeenCalledTimes(1);
  });
});

describe('CategorySelection Component', () => {
  it('renders all categories from the JayCee selection', () => {
    renderUI(<CategorySelection />);
    expect(screen.getByText('Everything your kitchen needs.')).toBeInTheDocument();
    expect(screen.getByText('Meats')).toBeInTheDocument();
    expect(screen.getByText('Seafood')).toBeInTheDocument();
    expect(screen.getByText('Dairy & Cheese')).toBeInTheDocument();
    expect(screen.getByText('Sausages & Cold Cuts')).toBeInTheDocument();
    expect(screen.getByText('Frozen & Fries')).toBeInTheDocument();
  });

  it('calls onSelectCategory when a category card is clicked', () => {
    const selectMock = vi.fn();
    renderUI(<CategorySelection onSelectCategory={selectMock} />);
    const meatsCard = screen.getByText('Meats');
    fireEvent.click(meatsCard);
    expect(selectMock).toHaveBeenCalledWith(expect.objectContaining({ id: 'meats' }));
  });
});

describe('LocationSection Component', () => {
  it('displays store address and travel times', () => {
    renderUI(<LocationSection />);
    expect(screen.getByText(/We've moved. Come find us./i)).toBeInTheDocument();
    expect(screen.getAllByText(/Osmeña Ave., B.M. Road, Puerto Princesa City, Palawan/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/City Proper/i)).toBeInTheDocument();
    expect(screen.getByText(/15–20 min/i)).toBeInTheDocument();
  });
});

describe('FAQSection Component', () => {
  it('expands accordion answer when question is clicked', () => {
    renderUI(<FAQSection />);
    const questionButton = screen.getByRole('button', {
      name: /Do you deliver outside Puerto Princesa\?/i,
    });
    expect(questionButton).toBeInTheDocument();

    // Click to expand
    fireEvent.click(questionButton);
    expect(
      screen.getByText(/primary direct delivery route covers Puerto Princesa proper/i)
    ).toBeInTheDocument();
  });
});

describe('CTA & Online Store Buttons', () => {
  it('points OnlineStoreBanner CTA to the required URL', () => {
    renderUI(<OnlineStoreBanner />);
    const storeLink = screen.getByRole('link', { name: /open online store/i });
    expect(storeLink.getAttribute('href')).toBe('https://jaycee.palawancollective.com/');
  });

  it('points PreFooterCTA button to the required URL', () => {
    renderUI(<PreFooterCTA />);
    const orderLink = screen.getByRole('link', { name: /order online/i });
    expect(orderLink.getAttribute('href')).toBe('https://jaycee.palawancollective.com/');
  });
});

describe('WholesaleModal Component', () => {
  it('renders form fields when open and handles input', () => {
    const closeMock = vi.fn();
    renderUI(<WholesaleModal isOpen={true} onClose={closeMock} />);

    expect(screen.getByText(/Wholesale Supply Enquiry/i)).toBeInTheDocument();
    const businessInput = screen.getByPlaceholderText(/e.g. El Nido Beach Resort/i);
    fireEvent.change(businessInput, { target: { value: 'Miniloc Resort' } });
    expect(businessInput).toHaveValue('Miniloc Resort');
  });
});

describe('JayCeeLogo Component', () => {
  it('renders brand colors correctly: JAY in yellow, C in red, EE in black', () => {
    renderUI(<JayCeeLogo />);

    const jayText = screen.getByText('JAY');
    const cText = screen.getByText('C');
    const eeText = screen.getByText('EE');
    const bannerText = screen.getByText('TRADING AND SERVICES');

    expect(jayText).toBeInTheDocument();
    expect(jayText).toHaveClass('text-[#F59E0B]');
    expect(cText).toBeInTheDocument();
    expect(cText).toHaveClass('text-[#DC2626]');
    expect(eeText).toBeInTheDocument();
    expect(eeText).toHaveClass('text-[#111827]');
    expect(bannerText).toBeInTheDocument();
  });
});

describe('BackToTop Component', () => {
  it('renders button and triggers scrollToTop on click', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    renderUI(<BackToTop />);
    const button = screen.getByRole('button', { name: /back to top/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(scrollToMock).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, behavior: 'smooth' })
    );
  });
});

