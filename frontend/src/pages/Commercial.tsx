import React, { useState, useRef } from 'react';
import './Commercial.css';
import FAQSection from '../components/FAQSection';
import Testimonials from '../components/Testimonials';
import NewFooter from '../components/NewFooter';
import QuoteModal from '../components/QuoteModal';
import ContactModal from '../components/ContactModal';
import BookConsultationButton from '../components/BookConsultationButton';

const Commercial: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const bookConsultationButtonRef = useRef<HTMLButtonElement>(null);
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

  return (
    <div className="App">
      <div className='content-wrapper'>
        <div className='headingofit'>
          <h1 className='head'>Commercial Solar Solutions</h1>
          <p className="subtitle">Power your business with sustainable energy</p>
          <button className="quote-button" onClick={handleOpenModal}>Get a Quote</button>
          <p className='para1'>Transform your business operations with our commercial solar solutions. Reduce operational costs and demonstrate your commitment to sustainability.</p>
        </div>
      </div>
      
      <section className="benefits-section">
        <h2>Why Choose Solar for Your Business?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Reduce Operational Costs</h3>
            <p>Significantly lower your electricity bills and improve your bottom line.</p>
          </div>
          <div className="benefit-card">
            <h3>Tax Benefits</h3>
            <p>Take advantage of accelerated depreciation and other tax incentives.</p>
          </div>
          <div className="benefit-card">
            <h3>Enhanced Brand Value</h3>
            <p>Demonstrate your commitment to sustainability and corporate responsibility.</p>
          </div>
          <div className="benefit-card">
            <h3>Reliable Power Supply</h3>
            <p>Ensure uninterrupted operations with our reliable solar solutions.</p>
          </div>
        </div>
      </section>

      <section className="process-section">
        <h2>Solar Solutions for Diverse Business Segments</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Industries</h3>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Commercial Establishments</h3>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Healthcare Centres</h3>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Educational Institutions</h3>
          </div>
          <div className="step">
            <div className="step-number">5</div>
            <h3>Petrol Pumps</h3>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <Testimonials />
      </section>

      <section className="faq-section">
        <FAQSection />
      </section>

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

export default Commercial; 