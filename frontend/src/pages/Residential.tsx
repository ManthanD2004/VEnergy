import React, { useState } from 'react';
import './Residential.css';
import FAQSection from '../components/FAQSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewFooter from '../components/NewFooter';
import QuoteModal from '../components/QuoteModal';

const Residential: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="content-wrapper">
        <div className="hero-section">
          <h1>Residential Solar Solutions</h1>
          <p className="subtitle">Power your home with clean, renewable energy</p>
          <div className="description">
            <p>Transform your home with sustainable solar energy. Our residential solutions are designed to maximize savings while reducing your carbon footprint.</p>
          </div>
          <button className="quote-button" onClick={handleOpenModal}>Get a Quote</button>
        </div>
      </div>
      
      <section className="benefits-section">
        <h2>Why Choose Solar for Your Home?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Reduce Electricity Bills</h3>
            <p>Save up to 90% on your monthly electricity bills with solar power.</p>
          </div>
          <div className="benefit-card">
            <h3>Government Subsidies</h3>
            <p>Avail up to 40% subsidy on your solar installation through government schemes.</p>
          </div>
          <div className="benefit-card">
            <h3>Easy Financing</h3>
            <p>Flexible financing options with 0% EMI available for qualified customers.</p>
          </div>
          <div className="benefit-card">
            <h3>25-Year Warranty</h3>
            <p>Long-term performance guarantee with our premium solar solutions.</p>
          </div>
        </div>
      </section>

      <section className="process-section">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Free Consultation</h3>
            <p>Our experts will assess your energy needs and roof space.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Custom Design</h3>
            <p>We create a solar solution tailored to your home.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Installation</h3>
            <p>Professional installation by our certified team.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Start Saving</h3>
            <p>Begin generating your own clean energy and reduce bills.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <TestimonialsSection />
      </section>

      <section className="faq-section">
        <FAQSection />
      </section>

      <NewFooter onOpenModal={handleOpenModal} />
      <QuoteModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Residential; 