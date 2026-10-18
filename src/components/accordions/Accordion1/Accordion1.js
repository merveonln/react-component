import React, { useState } from "react";
import "./style.css";

const Accordion1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const accordionData = [
    {
      id: 1,
      icon: "🚀",
      title: "Modern React Development",
      subtitle: "Build powerful applications",
      content: "React ile modern, hızlı ve ölçeklenebilir web uygulamaları geliştirin. Component-based yapısı sayesinde kodunuzu yeniden kullanılabilir hale getirin.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#667eea"
    },
    {
      id: 2,
      icon: "🎨",
      title: "Beautiful UI Components",
      subtitle: "Design that inspires",
      content: "Kullanıcı deneyimini en üst seviyeye çıkaran, görsel olarak çekici ve kullanımı kolay arayüz bileşenleri oluşturun.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "#f093fb"
    },
    {
      id: 3,
      icon: "⚡",
      title: "High Performance",
      subtitle: "Speed matters",
      content: "Optimize edilmiş kodlama teknikleri ve best practice'ler ile yüksek performanslı uygulamalar geliştirin.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#4facfe"
    },
    {
      id: 4,
      icon: "💎",
      title: "Premium Quality",
      subtitle: "Excellence guaranteed",
      content: "Profesyonel standartlarda, test edilmiş ve güvenilir kod yapısı ile projelerinizi bir üst seviyeye taşıyın.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      color: "#43e97b"
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="one-accordion-wrapper">
      <div className="one-accordion-container">
        {accordionData.map((item, index) => (
          <div 
            className={`one-accordion ${openIndex === index ? "one-active" : ""}`} 
            key={item.id}
          >
            <div 
              className="one-accordion-header" 
              onClick={() => toggleAccordion(index)}
              style={{
                background: openIndex === index ? item.gradient : 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="one-header-left">
                <div 
                  className="one-icon-box"
                  style={{
                    background: openIndex === index ? 'rgba(255, 255, 255, 0.2)' : item.gradient
                  }}
                >
                  <span className="one-icon">{item.icon}</span>
                </div>
                <div className="one-title-group">
                  <h3>{item.title}</h3>
                  <p className="one-subtitle">{item.subtitle}</p>
                </div>
              </div>
              
              <div className={`one-icon-toggle ${openIndex === index ? "one-rotated" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            
            <div className={`one-accordion-content ${openIndex === index ? "one-open" : ""}`}>
              <div className="one-content-inner">
                <div className="one-content-decorator" style={{ background: item.gradient }}></div>
                <p>{item.content}</p>
              </div>
            </div>

            {openIndex === index && (
              <div 
                className="one-bottom-line"
                style={{ background: item.gradient }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion1;
