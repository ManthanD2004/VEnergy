import React from 'react';
import './TestimonialsSection.css';
import NewsSection from './NewsSection';

const TestimonialsSection: React.FC = () => {
  return (
    <>
      <section className="testimonials-section">
        <div className="testimonials-header">
          <h2>Hear Directly From</h2>
          <h2>Our Satisfied Customers</h2>
        </div>
        <div className="testimonials-cards-container">
          {/* Testimonial Card 1 */}
          <div className="testimonial-card">
            <div className="customer-image-container">
              <img src="https://via.placeholder.com/100" alt="Customer 1" className="customer-image" />
            </div>
            <h3>Gajendra Shkya</h3>
            <p className="customer-location">
              <span className="location-icon">&#9906;</span> Indore, Madhya Pradesh
            </p>
            <p className="testimonial-text">
              It's been 1 year since Freyr Energy installed system on my home. We have not faced any issues and are very happy with their service. Highly recommend Freyr Energy.
            </p>
          </div>

          {/* Testimonial Card 2 */}
          <div className="testimonial-card">
            <div className="customer-image-container">
              <img src="https://via.placeholder.com/100" alt="Customer 2" className="customer-image" />
            </div>
            <h3>Uttam Malani</h3>
            <p className="customer-location">
              <span className="location-icon">&#9906;</span> Hyderabad, Telangana
            </p>
            <p className="testimonial-text">
              We have installed solar in 4 of our facilities with Freyr Energy and our energy costs has reduced substantially. Our consumers are already appreciating our efforts towards sustainability & net-zero.
            </p>
          </div>

          {/* Testimonial Card 3 */}
          <div className="testimonial-card">
            <div className="customer-image-container">
              <img src="https://via.placeholder.com/100" alt="Customer 3" className="customer-image" />
            </div>
            <h3>Mahesh Mishra</h3>
            <p className="customer-location">
              <span className="location-icon">&#9906;</span> Jabalpur, Madhya Pradesh
            </p>
            <p className="testimonial-text">
              Freyr Energy installed 3kW system on my house in Hyderabad. I used to pay ₹ 2,500-3,000 before solar in electricity bills and last month I paid only ₹ 300! Their after-sales is also very quick & reliable.
            </p>
          </div>
        </div>
      </section>
      <NewsSection />
    </>
  );
};

export default TestimonialsSection; 