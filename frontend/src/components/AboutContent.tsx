import React, { useState, useEffect } from 'react';
import './AboutContent.css';

const AboutContent: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title:"About Us",
      content: "We Are India's Leading Solar Energy Company Minsun Solar is one of the renowned rooftop solar companies across India. We install solar panels for houses and businesses. With over 1,000+ delighted clients across India, we have been offering world-class solar solutions to homes and businesses since 2014. We are affiliated with MNRE. We hope to make rooftop solar accessible to everyone."
    },
    {
      title: "Our Mission",
      content: "Our mission is to empower every home and business across India with clean, affordable, and reliable solar energy. We simplify the process, making solar accessible to all. Through innovation and customer-focused solutions, we strive to revolutionise the Indian energy landscape, building a more sustainable and equitable future."
    },
    {
      title: "Our Vision",
      content: "We envision a future where clean energy from solar is the norm, not a luxury. A world where individuals and businesses have control over their energy sources and environmental impact."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-content">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            {slide.title && <h2>{slide.title}</h2>}
            <p>{slide.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutContent; 