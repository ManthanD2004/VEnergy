import React from 'react';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2>Our Testimonials</h2>
      </div>
      <div className="testimonials-cards-container">
        {/* Testimonial Card 1 */}
        <div className="testimonial-card">
          <div className="customer-image-container">
          </div>
          <h3>Gajendra Shakya</h3>
          <p className="customer-location">
            <span className="location-icon">&#9906;</span> Indore, Madhya Pradesh
          </p>
          <p className="testimonial-text">
            It's been 1 year since Minsun Solar installed system on my home. We have not faced any issues and are very happy with their service. Highly recommend Minsun Solar.
          </p>
        </div>

        {/* Testimonial Card 2 */}
        <div className="testimonial-card">
          <div className="customer-image-container">
          </div>
          <h3>Uttam Malani</h3>
          <p className="customer-location">
            <span className="location-icon">&#9906;</span> Nagpur, Maharashtra
          </p>
          <p className="testimonial-text">
            We have installed solar in 4 of our facilities with Minsun Solar and our energy costs has reduced substantially. Our consumers are already appreciating our efforts towards sustainability & net-zero.
          </p>
        </div>

        {/* Testimonial Card 3 */}
        <div className="testimonial-card">
          <div className="customer-image-container">
          </div>
          <h3>Mahesh Mishra</h3>
          <p className="customer-location">
            <span className="location-icon">&#9906;</span> Jabalpur, Madhya Pradesh
          </p>
          <p className="testimonial-text">
            Minsun Solar installed 3kW system on my house in Jabalpur. I used to pay ₹ 2,500-3,000 before solar in electricity bills and last month I paid only ₹ 300! Their after-sales is also very quick & reliable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 