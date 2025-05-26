import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import WhyChooseUs from './components/WhyChooseUs';
import CustomerSegments from './components/CustomerSegments';
import NewSection from './components/NewSection';
import ImpactSection from './components/ImpactSection';
import NewsSection from './components/NewsSection';
import FAQSection from './components/FAQSection';
import NewFooter from './components/NewFooter';
import QuoteModal from './components/QuoteModal';
import BookConsultationButton from './components/BookConsultationButton';
import TestimonialsSection from './components/TestimonialsSection';
import ContactModal from './components/ContactModal';
import Residential from './pages/Residential';
import Commercial from './pages/Commercial';

const Layout: React.FC = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const scrolled = window.scrollY > 200;
        if (scrolled) {
          navbarRef.current.classList.add('scrolled-navbar');
          setShowScrollToTop(true);
        } else {
          navbarRef.current.classList.remove('scrolled-navbar');
          setShowScrollToTop(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar ref={navbarRef} />
      <Outlet />
      {showScrollToTop && (
        <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          &#x25b2;
        </button>
      )}
    </>
  );
};

const Home: React.FC = () => {
  const bookConsultationButtonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactButtonPosition, setContactButtonPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenContactModal = () => {
    if (bookConsultationButtonRef.current) {
      const rect = bookConsultationButtonRef.current.getBoundingClientRect();
      setContactButtonPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const button = bookConsultationButtonRef.current;
    const modal = document.querySelector('.contact-modal-content');
    
    if (!button || !modal) return;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const buttonRect = button.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();
    
    const isOutsideButton = 
      mouseX < buttonRect.left ||
      mouseX > buttonRect.right ||
      mouseY < buttonRect.top ||
      mouseY > buttonRect.bottom;
      
    const isOutsideModal = 
      mouseX < modalRect.left ||
      mouseX > modalRect.right ||
      mouseY < modalRect.top ||
      mouseY > modalRect.bottom;
      
    if (isOutsideButton && isOutsideModal) {
      handleCloseContactModal();
    }
  };

  return (
    <div className="App" onMouseMove={handleMouseLeave}>
      <div className="content-wrapper">
        <main className="container">
          <h1>Welcome to Minsun Solar</h1>
          <p className="subtitle">Your trusted partner in solar energy solutions.</p>
          <div className="description">
            <p>Minsun Solar is a leading rooftop solar company, empowering homes and businesses across India with clean, reliable energy. MNRE-empanelled and customer-focused, we offer smart solar solutions, easy 0% EMI options, and dedicated support—making solar simple, affordable, and accessible for everyone.</p>
          </div>
          <button className="quote-button" onClick={handleOpenModal}>Get a Quote</button>
        </main>
      </div>
      <WhyChooseUs />
      <CustomerSegments />
      <NewSection onOpenModal={handleOpenModal} />
      <ImpactSection />
      <TestimonialsSection />
      <FAQSection />
      <NewFooter onOpenModal={handleOpenModal} />
      <QuoteModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <BookConsultationButton
        ref={bookConsultationButtonRef}
        onMouseEnter={handleOpenContactModal}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        buttonPosition={contactButtonPosition}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/residential" element={<Residential />} />
        <Route path="/commercial" element={<Commercial />} />
      </Route>
    </Routes>
  );
};

export default App;
