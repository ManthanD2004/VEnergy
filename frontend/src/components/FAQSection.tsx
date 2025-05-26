import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection: React.FC = () => {
  const faqs = [
    { 
      question: "What are the benefits of installing solar panels on my home?", 
      answer: "Installing solar panels at home reduces electricity bills, lowers your carbon footprint, increases energy independence, and can even increase your property value. It's a sustainable investment that pays off over time." 
    },
    { 
      question: "What are the applications of solar power?", 
      answer: "Solar power can be used for various applications including residential rooftop systems, commercial and industrial installations, large-scale solar farms, powering remote areas, water heating, and even transportation." 
    },
    { 
      question: "Can I get an App to monitor my Solar System?", 
      answer: "Yes, many modern solar systems come with monitoring apps that allow you to track your system's performance, energy production, and consumption in real-time from your smartphone or computer." 
    },
    { 
      question: "How much do solar panels cost for a business?", 
      answer: "The cost of solar panels for a business varies widely depending on the size of the installation, location, system type, and available incentives. We recommend booking a free consultation for a tailored quote." 
    },
    { 
      question: "How much does a 1kW solar panel cost?", 
      answer: "The cost of a 1kW solar panel system can vary based on factors like brand, technology, installation complexity, and location. It's best to get a specific quote from a provider for an accurate estimate." 
    },
    { 
      question: "Who offers an affordable solar panel subsidy?", 
      answer: "Government subsidies and incentives for solar panels are available at both central and state levels in many regions. These can significantly reduce the initial cost. We can help you navigate the available options during our consultation." 
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            <div className="faq-question">
              <p>{faq.question}</p>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer-wrapper">
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 