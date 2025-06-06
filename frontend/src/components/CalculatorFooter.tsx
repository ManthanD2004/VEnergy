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
          <div className="footer-logo">Minsun Solar</div>
        </div>
        <div className="footer-contact-section">
          <a className="get-a-quote" onClick={onOpenModal}>GET A QUOTE</a>
          <div className="contact-info">
            <p><span>&#9742;</span> 9000828333</p>
            <p><span>&#9993;</span> sales@freyrenergy.com</p>
            <p><span>&#9906;</span> Freyr Energy Services Pvt Ltd<br/>301, 3rd Floor, KKR Square, Kavuri Hills, Phase I, Road no. 36<br/>Hyderabad, India - 500033</p>
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