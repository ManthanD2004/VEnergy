import React from 'react';
import './CustomerSegments.css';
import residentialImage from '../assets/solar-energy.webp';
import commercialImage from '../assets/Commercial-Solar-for-Landowners-September-blog-1.jpg';
import { Link } from 'react-router-dom';

const CustomerSegments: React.FC = () => {
  return (
    <section className="customer-segments-section">
      <h2>Our Customer Segments</h2>
      <div className="segments-container">
        <div className="segment-item">
          <Link to="/residential">
            <img src={residentialImage} alt="Residential Solar Installation" />
          </Link>
          <div className="segment-overlay">
            <h3>RESIDENTIAL</h3>
          </div>
        </div>
        <div className="segment-item">
          <Link to="/commercial">
            <img src={commercialImage} alt="Commercial Solar Installation" />
          </Link>
          <div className="segment-overlay">
            <h3>COMMERCIAL</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSegments; 