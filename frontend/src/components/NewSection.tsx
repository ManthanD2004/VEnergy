import React from 'react';
import './NewSection.css';

interface NewSectionProps {
  onOpenModal: () => void;
}

const NewSection: React.FC<NewSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="new-section">
      <h2>Choose Solar in 4 Easy Steps</h2>
      <div className="steps-container">
        <div className="step-card">
          <div className="icon-placeholder">{/* Icon */}</div>
          <h3>Book a Free Consultation</h3>
          <p>Talk to our team to understand your system size, pricing, subsidy eligibility and explore finance options</p>
        </div>
        <div className="step-card">
          <div className="icon-placeholder">{/* Icon */}</div>
          <h3>Review Proposal & Confirm Order</h3>
          <p>Review your proposal and approve costing & design specification on Freyr Energy App</p>
        </div>
        <div className="step-card">
          <div className="icon-placeholder">{/* Icon */}</div>
          <h3>Track Project Installation</h3>
          <p>We manage the project from start to finish including subsidy documentation, liaisoning and net-metering</p>
        </div>
        <div className="step-card">
          <div className="icon-placeholder">{/* Icon */}</div>
          <h3>Your Site is Solar Powered</h3>
          <p>We offer 24X7 service support and proactive maintenance to ensure that the system operates at peak efficiency with Freyr Energy App</p>
        </div>
      </div>
      <button className="book-now-button" onClick={onOpenModal}>Book Now</button>
    </section>
  );
};

export default NewSection; 