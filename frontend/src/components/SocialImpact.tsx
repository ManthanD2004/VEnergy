import React from 'react';
import './SocialImpact.css';

const SocialImpact: React.FC = () => {
  return (
    <section className="social-impact-section">
      <h2>Social Impact</h2>
      <div className="impact-cards-grid">
        <div className="impact-card">
          {/* Placeholder for Icon */}
          <div className="impact-value">20 Lakh</div>
          <div className="impact-description">Lives Impacted</div>
        </div>
        <div className="impact-card">
          {/* Placeholder for Icon */}
          <div className="impact-value">82,500 Tons</div>
          <div className="impact-description">CO2 Emissions Reduced</div>
        </div>
        <div className="impact-card">
          {/* Placeholder for Icon */}
          <div className="impact-value">1,000+</div>
          <div className="impact-description">Jobs Created</div>
        </div>
        <div className="impact-card">
          {/* Placeholder for Icon */}
          <div className="impact-value">60%</div>
          <div className="impact-description">Women in Leadership</div>
        </div>
      </div>
    </section>
  );
};

export default SocialImpact; 