import React from 'react';
import './ImpactSection.css';

const ImpactSection: React.FC = () => {
  return (
    <section className="impact-section">
      <h2>Impact</h2>
      <div className="impact-cards-container">
        <div className="impact-card">
          <div className="impact-icon-placeholder">{/* Icon for CO2 */}</div>
          <h3>82,500 Tons</h3>
          <p>CO2 Emissions Reduced</p>
        </div>
        <div className="impact-card">
          <div className="impact-icon-placeholder">{/* Icon for MW Installed */}</div>
          <h3>100+</h3>
          <p>MW Installed</p>
        </div>
        <div className="impact-card">
          <div className="impact-icon-placeholder">{/* Icon for Lives Impacted */}</div>
          <h3>20 Lakh</h3>
          <p>Lives Impacted</p>
        </div>
        <div className="impact-card">
          <div className="impact-icon-placeholder">{/* Icon for Saved Annually */}</div>
          <h3>₹562 Cr</h3>
          <p>Saved Annually</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection; 