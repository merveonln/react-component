import React, { useState } from 'react';
import './style.css';

const AccordionItem = ({ title, content, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`image-accordion-item ${isOpen ? 'active' : ''}`}
      style={{
        '--accent-color': color
      }}
    >
      <div 
        className="image-accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="image-accordion-title">
          <span className="image-accordion-dot"></span>
          {title}
        </div>
        <div className="image-accordion-indicator">
          <svg viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="image-accordion-content">
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion2 = () => {
  const accordionData = [
    {
      title: "UI/UX Tasarımı",
      content: "Modern kullanıcı arayüzü tasarımları ile kullanıcı deneyimini en üst seviyeye çıkarın.",
      color: "#3498db"
    },
    {
      title: "Frontend Teknolojileri", 
      content: "React, Vue ve modern JavaScript framework'leri ile güçlü web uygulamaları geliştirin.",
      color: "#2ecc71"
    },
    {
      title: "Performans Optimizasyonu",
      content: "Web uygulamalarınızın hızını ve verimliliğini artıracak teknikleri keşfedin.",
      color: "#e74c3c"
    }
  ];

  return (
    <div className='image-accordion-container'>
        <div className="image-accordion">
        {accordionData.map((item, index) => (
            <AccordionItem 
            key={index} 
            title={item.title} 
            content={item.content}
            color={item.color}
            />
        ))}
        </div>
    </div>
  );
};

export default Accordion2;