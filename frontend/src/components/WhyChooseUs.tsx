import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-choose-us-section">
      <div className="why-choose-us-container">
        <div className="background-circle"></div>
        <div className="main-circle">
          <h2>WHY CHOOSE US</h2>
        </div>
        <div className="features-list">
          <div className="feature-item">
            <div className="icon-circle">1</div>
            <div className="item-text">
              <h3>MNRE-Empanelled</h3>
              <p>Custom-designed systems to match your energy needs and budget.    </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="icon-circle">2</div>
            <div className="item-text">
               <h3>Tailored Solar Solutions</h3>
              <p>Custom-designed systems to match your energy needs and budget.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="icon-circle">3</div>
            <div className="item-text">
               <h3>Trusted Banking Partnerships</h3>
              <p>Seamless financing through leading banks to support your solar journey.</p>
            </div>
          </div>
           <div className="feature-item">
            <div className="icon-circle">4</div>
            <div className="item-text">
               <h3>Reliable Support</h3>
              <p>Expert assistance before, during, and after installation—just a call away.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="icon-circle">5</div>
            <div className="item-text">
               <h3>Smart Monitoring</h3>
              <p>Track your solar performance 24/7 with our user-friendly dashboard.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="icon-circle">6</div>
            <div className="item-text">
               <h3>Trusted by Thousands</h3>
              <p>A growing family of happy customers across India powering up with Minsun.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
