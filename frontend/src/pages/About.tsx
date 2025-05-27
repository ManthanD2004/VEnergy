import React, { useState, useRef } from 'react';
import NewFooter from '../components/NewFooter';
import './About.css'; // Import the CSS file
import QuoteModal from '../components/QuoteModal'; // Import QuoteModal if needed by Footer
import AboutContent from '../components/AboutContent'; // Import AboutContent
import SocialImpact from '../components/SocialImpact'; // Import SocialImpact
import ContactModal from '../components/ContactModal'; // Import ContactModal
import BookConsultationButton from '../components/BookConsultationButton'; // Import BookConsultationButton

const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Add state and handlers for ContactModal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const bookConsultationButtonRef = useRef<HTMLButtonElement>(null); // Ref for positioning
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

  // Handlers for ContactModal
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
      <div className="content-wrapper">
        <AboutContent />
        <img src="/Picsart_25-05-27_17-04-26-792[1].jpg" alt="" className="full-width-image" />
        <SocialImpact />
        {/* No other content here as per request */}
      </div>
      {/* Pass onOpenModal prop if required by NewFooter */}
      <NewFooter onOpenModal={handleOpenModal} />
      {/* Render QuoteModal if needed */}
      <QuoteModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Add ContactModal and BookConsultationButton */}
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

export default About; 