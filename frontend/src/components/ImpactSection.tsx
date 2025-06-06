import React from 'react';
import './ImpactSection.css';
import livesImpactedIcon from '../assets/lives_impacted_icon.png';
import co2EmissionsReducedIcon from '../assets/reduce_icon.png';
import mwInstalledIcon from '../assets/install_icon.png';
import savedAnnuallyIcon from '../assets/money_saved_icon.png';

const ImpactSection: React.FC = () => {
  return (
    <section className="impact-section">
      <h2>Impact</h2>
      <div className="impact-cards-container">
        <div className="impact-card">
          <div className="impact-icon-placeholder">
            <img src={co2EmissionsReducedIcon} alt="CO2 Emissions Reduced Icon" className="impact-icon-img" />
          </div>
          <h3>82,500 Tons</h3>
          <p>CO2 Emissions Reduced</p>
        </div>
        <div className="impact-card">
          <div className="impact-icon-placeholder">
            <img src={mwInstalledIcon} alt="MW Installed Icon" className="impact-icon-img" />
          </div>
          <h3>100+</h3>
          <p>MW Installed</p>
        </div>
        <div className="impact-card">
          <div className="impact-icon-placeholder">
            <img src={livesImpactedIcon} alt="Lives Impacted Icon" className="impact-icon-img" />
          </div>
          <h3>20 Lakh</h3>
          <p>Lives Impacted</p>
        </div>
        <div className="impact-card">
          <div className="impact-icon-placeholder">
            <img src={savedAnnuallyIcon} alt="Saved Annually Icon" className="impact-icon-img" />
          </div>
          <h3>₹562 Cr</h3>
          <p>Saved Annually</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection; 