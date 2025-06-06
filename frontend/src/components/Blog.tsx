import React, { useRef, useEffect } from 'react';
import './Blog.css';

const Blog: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 2; // Increased from 1 to 2 for faster scrolling
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          // Reset to start when reaching the end
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollLeft += scrollAmount;
        }
      }, 20); // Decreased from 30ms to 20ms for smoother and faster scrolling
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    // Start scrolling
    startScrolling();

    // Pause scrolling when hovering over the container
    scrollContainer.addEventListener('mouseenter', stopScrolling);
    scrollContainer.addEventListener('mouseleave', startScrolling);

    // Cleanup
    return () => {
      stopScrolling();
      scrollContainer.removeEventListener('mouseenter', stopScrolling);
      scrollContainer.removeEventListener('mouseleave', startScrolling);
    };
  }, []);

  return (
    <section className="news-section">
      <h2>Our Recent Projects</h2>
      <div className="news-cards-container" ref={scrollContainerRef}>
        {/* Card 1 */}
        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 1" />
          <div className="news-card-content">
            <h3>Freyer Energy Launched Solar Experience Centre in Vijayawada</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 2" />
          <div className="news-card-content">
            <h3>Freyer Energy's Solar Experience Centre Opened in Karimnagar</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 3" />
          <div className="news-card-content">
            <h3>Andhra Pradesh's First Rooftop Solar Experience Centre Opens in Visakhapatnam</h3>
          </div>
        </div>

        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 4" />
          <div className="news-card-content">
            <h3>Andhra Pradesh's First Rooftop Solar Experience Centre Opens in Visakhapatnam</h3>
          </div>
        </div>

        <div className="news-card">
          <img src="https://via.placeholder.com/350x200" alt="News Image 5" />
          <div className="news-card-content">
            <h3>Andhra Pradesh's First Rooftop Solar Experience Centre Opens in Visakhapatnam</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog; 