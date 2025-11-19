import React, { useState } from "react";
import "./style.css";

const accordionData = [
  {
    id: 1,
    title: "Mountain Adventure",
    subtitle: "Explore the peaks",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Dağların zirvesinde eşsiz bir deneyim yaşayın. Kristal berraklığındaki hava ve muhteşem manzaralar sizi bekliyor.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#667eea"
  },
  {
    id: 2,
    title: "Ocean Paradise",
    subtitle: "Feel the waves",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    description: "Sakin okyanus dalgalarının huzurunu hissedin. Masmavi sular ve altın renkli kumlar ile unutulmaz anlar.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#4facfe"
  },
  {
    id: 3,
    title: "Forest Serenity",
    subtitle: "Nature's embrace",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    description: "Yeşilin binbir tonuyla dolu ormanların huzurlu atmosferinde kendinizi bulun. Doğanın kucaklayışını hissedin.",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    color: "#43e97b"
  },
  {
    id: 4,
    title: "Desert Sunset",
    subtitle: "Golden horizons",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    description: "Çölde büyüleyici gün batımına tanık olun. Altın sarısı kumların üzerinde dans eden ışık oyunları.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    color: "#fa709a"
  }
];

function Accordion3() {
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const handleAccordionClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="accordion3-wrapper">
      <div className="accordion3-background">
        <div className="accordion3-glow accordion3-glow-1"></div>
        <div className="accordion3-glow accordion3-glow-2"></div>
      </div>

      <div className="accordion-box">
        <div className="accordion-container">
          {accordionData.map((item) => (
            <div
              key={item.id}
              className={`accordion-item ${activeId === item.id ? "accordion-active" : ""}`}
              onClick={() => handleAccordionClick(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                flex: activeId === item.id ? "3" : "1"
              }}
            >
              <div
                className="accordion-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="accordion-overlay" style={{ background: activeId === item.id ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)' }}></div>
              </div>
              
              <div className="accordion-content">
                <div className="accordion-number" style={{ 
                  background: activeId === item.id ? item.gradient : 'rgba(255, 255, 255, 0.15)',
                  borderColor: item.color
                }}>
                  {String(item.id).padStart(2, '0')}
                </div>
                
                <div className="accordion-text-content">
                  <h2>{item.title}</h2>
                  <p className="accordion-subtitle">{item.subtitle}</p>
                  
                  {activeId === item.id && (
                    <div className="accordion-description">
                      <div className="accordion-divider" style={{ background: item.gradient }}></div>
                      <p>{item.description}</p>
                      <button className="accordion-explore-btn" style={{ background: item.gradient }}>
                        <span>Explore More</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {activeId === item.id && (
                  <div className="accordion-particles">
                    <span style={{ background: item.color, left: "20%", animationDelay: "0s" }}></span>
                    <span style={{ background: item.color, left: "40%", animationDelay: "0.3s" }}></span>
                    <span style={{ background: item.color, left: "60%", animationDelay: "0.6s" }}></span>
                    <span style={{ background: item.color, left: "80%", animationDelay: "0.9s" }}></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accordion3;
