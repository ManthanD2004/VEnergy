import React, { useState } from 'react';
import './Commercial.css';
import FAQSection from '../components/FAQSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewFooter from '../components/NewFooter';
import QuoteModal from '../components/QuoteModal';

const Commercial: React.FC = () => {
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
          <h1>Commercial Solar Solutions</h1>
          <p className="subtitle">Power your business with sustainable energy</p>
          <div className="description">
            <p>Transform your business operations with our commercial solar solutions. Reduce operational costs and demonstrate your commitment to sustainability.</p>
          </div>
          <button className="quote-button" onClick={handleOpenModal}>Get a Quote</button>
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
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Energy Assessment</h3>
            <p>We analyze your energy consumption patterns and requirements.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Custom Solution</h3>
            <p>Design a solar system optimized for your business needs.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Professional Installation</h3>
            <p>Minimal disruption to your operations during installation.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Ongoing Support</h3>
            <p>Comprehensive maintenance and monitoring services.</p>
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

export default Commercial; 