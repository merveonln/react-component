import React, { useState } from 'react';
import './style.css';

const AccordionItem = ({ title, subtitle, content, color, gradient, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`image-accordion-item ${isOpen ? 'image-active' : ''}`}
    >
      <div 
        className="image-accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen ? gradient : 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="image-header-left">
          <div 
            className="image-number-badge"
            style={{
              background: isOpen ? 'rgba(255, 255, 255, 0.2)' : color,
              borderColor: color
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="image-accordion-title">
            <span className="image-accordion-dot" style={{ background: color }}></span>
            <div className="image-title-group">
              <h3>{title}</h3>
              <p className="image-subtitle">{subtitle}</p>
            </div>
          </div>
        </div>
        
        <div className={`image-accordion-indicator ${isOpen ? 'image-rotated' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M7 10l5 5 5-5z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="image-accordion-content">
          <div className="image-content-inner">
            <div className="image-content-icon" style={{ background: gradient }}>
              ✨
            </div>
            <p>{content}</p>
            <div className="image-tags">
              <span className="image-tag" style={{ borderColor: color, color: color }}>Premium</span>
              <span className="image-tag" style={{ borderColor: color, color: color }}>Featured</span>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="image-glow-line" style={{ background: gradient }}></div>
      )}
    </div>
  );
};

const Accordion2 = () => {
  const accordionData = [
    {
      title: "UI/UX Design Excellence",
      subtitle: "Create stunning interfaces",
      content: "Modern kullanıcı arayüzü tasarımları ile kullanıcı deneyimini en üst seviyeye çıkarın. Her detayda mükemmellik için tasarlanmış profesyonel çözümler.",
      gradient: "linear-gradient(135deg, #3498db 0%, #8e44ad 100%)",
      color: "#3498db"
    },
    {
      title: "Frontend Technologies",
      subtitle: "Modern development stack",
      content: "React, Vue ve modern JavaScript framework'leri ile güçlü web uygulamaları geliştirin. Component-based mimari ile ölçeklenebilir projeler oluşturun.",
      gradient: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
      color: "#2ecc71"
    },
    {
      title: "Performance Optimization",
      subtitle: "Speed and efficiency",
      content: "Web uygulamalarınızın hızını ve verimliliğini artıracak teknikleri keşfedin. Lazy loading, code splitting ve caching stratejileri ile optimize edin.",
      gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
      color: "#e74c3c"
    },
    {
      title: "Responsive Design",
      subtitle: "Works on all devices",
      content: "Her ekran boyutunda mükemmel görünüm sağlayan responsive tasarımlar oluşturun. Mobile-first yaklaşımı ile modern web standartlarını yakalayın.",
      gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
      color: "#f39c12"
    }
  ];

  return (
    <div className='image-accordion-wrapper'>
      <div className="image-accordion-container">
        <div className="image-accordion">
          {accordionData.map((item, index) => (
            <AccordionItem 
              key={index}
              index={index}
              title={item.title}
              subtitle={item.subtitle}
              content={item.content}
              color={item.color}
              gradient={item.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion2;