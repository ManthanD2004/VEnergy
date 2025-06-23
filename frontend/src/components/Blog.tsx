import React from 'react';
import './Blog.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const projects = [
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Minsun Solar Launched Solar Experience Centre in Bhopal"
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Minsun Solar's Solar Experience Centre Opened in Indore"
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Maharashtra's First Rooftop Solar Experience Centre Opens in Nagpur"
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Installed a 5 kW grid-tied solar system for a family home in Ujjain, enabling over 80% reduction in electricity bills."
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Completed a 25 kW rooftop solar system for a packaging facility in Pune. With smart inverters and battery backup."
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Minsun Solar Launched Solar Experience Centre in Pachmarhi"
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Minsun Solar's Solar Experience Centre Opened in Gwalior"
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Madhya Pradesh's HighTech Rooftop Solar Experience Centre Opens in Agarmalwa"
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Madhya Pradesh's Latest Rooftop Solar Experience Centre Opens in Raisen"
  },
  {
    img: 'https://via.placeholder.com/350x200',
    title: "Madhya Pradesh's First Rooftop Solar Experience Centre Opens in Vidisha"
  }
];

const Blog: React.FC = () => {
  return (
    <section className="news-section">
      <h2>Our Recent Projects</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={8}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        centeredSlides={false}
        breakpoints={{
          320: { slidesPerView: 1, centeredSlides: true, spaceBetween: 4 },
          600: { slidesPerView: 2, centeredSlides: false, spaceBetween: 8 },
          900: { slidesPerView: 3, centeredSlides: false, spaceBetween: 24 }
        }}
      >
        {projects.map((project, idx) => (
          <SwiperSlide key={idx}>
            <div className="news-card">
              <img src={project.img} alt={project.title} loading="lazy" />
              <div className="news-card-content">
                <h3>{project.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Blog; 