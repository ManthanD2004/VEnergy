import React from 'react';
import './CalculatorFooter.css';

interface CalculatorFooterProps {
  onOpenModal: () => void;
}

const CalculatorFooter: React.FC<CalculatorFooterProps> = ({ onOpenModal }) => {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-logo-section">
          {/* Placeholder for logo */}
          <div className="footer-logo">V.Energy</div>
        </div>
        <div className="footer-contact-section">
          <a className="get-a-quote" onClick={onOpenModal}>GET A QUOTE</a>
          <div className="contact-info">
            <p><span>&#9742;</span> 7441100802</p>
            <p><span>&#9993;</span> minsunbpl@gmail.com</p>
            <p><span>&#9906;</span> V.Energy<br/> Ishaan park, A3 T3, Manak Vihar, Patel Nagar, Bhopal, Madhya Pradesh 462022</p>
          </div>
          <div className="social-icons">
            {/* Placeholder for social icons */}
            <a onClick={handleLinkClick}>&#x25ce;</a> {/* Instagram */}
            <a onClick={handleLinkClick}>&#xf09a;</a> {/* Facebook - Requires Font Awesome or similar */}
            <a onClick={handleLinkClick}>X</a> {/* X (Twitter) */}
            <a onClick={handleLinkClick}>&#x25b6;</a> {/* YouTube */}
            <a onClick={handleLinkClick}>in</a> {/* LinkedIn */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CalculatorFooter; 