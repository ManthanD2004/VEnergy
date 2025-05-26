import React from 'react';
import './NewsSection.css';

const NewsSection: React.FC = () => {
  return (
    <section className="news-section">
      <h2>Blogs</h2>
      <div className="news-cards-container">
        {/* Card 1 */}
        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 1" />
          <div className="news-card-content">
            <h3>Freyer Energy Launched Solar Experience Centre in Vijayawada</h3>
            <a href="#" className="read-more">Read more</a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 2" />
          <div className="news-card-content">
            <h3>Freyer Energy's Solar Experience Centre Opened in Karimnagar</h3>
            <a href="#" className="read-more">Read more</a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 3" />
          <div className="news-card-content">
            <h3>Andhra Pradesh's First Rooftop Solar Experience Centre Opens in Visakhapatnam</h3>
            <a href="#" className="read-more">Read more</a>
          </div>
        </div>
      </div>
      <button className="news-read-more-button">Read more</button>
    </section>
  );
};

export default NewsSection; 