import React, { useState } from "react";
import "./style.css";

const Accordion4 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const accordionData = [
    {
      id: 1,
      title: "Premium Glassmorphism Design",
      subtitle: "Modern cam efekti ile şık görünüm",
      content: "Glassmorphism ve 3D efektlerle donatılmış premium bir kullanıcı deneyimi. Tüm modern tarayıcılarda mükemmel çalışır. backdrop-filter ve blur efektleri ile profesyonel tasarım.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#667eea",
      lightColor: "rgba(102, 126, 234, 0.2)"
    },
    {
      id: 2,
      title: "Advanced Animations",
      subtitle: "Akıcı ve etkileyici hareketler",
      content: "Her tıklamada hayat bulan yumuşak geçişler, parçacık efektleri ve 3D transformasyonlar ile kullanıcılarınızı büyüleyin. 60fps performans garantisi.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "#f093fb",
      lightColor: "rgba(240, 147, 251, 0.2)"
    },
    {
      id: 3,
      title: "Vibrant Color Palette",
      subtitle: "Canlı ve göz alıcı renkler",
      content: "Her accordion öğesi için özel gradient ve renk paleti. Markanıza uygun renklerle kolayca özelleştirin. Dinamik renk geçişleri ile dikkat çekin.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#4facfe",
      lightColor: "rgba(79, 172, 254, 0.2)"
    },
    {
      id: 4,
      title: "Ultra Performance",
      subtitle: "Hızlı ve optimize edilmiş",
      content: "CSS3 ve React Hooks ile optimize edilmiş, minimum render ile maksimum performans sağlayan akıllı yapı. GPU-accelerated animasyonlar.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      color: "#43e97b",
      lightColor: "rgba(67, 233, 123, 0.2)"
    },
    {
      id: 5,
      title: "Social Media Ready",
      subtitle: "TikTok ve Instagram için hazır",
      content: "TikTok, Instagram ve diğer platformlar için optimize edilmiş, viral olmaya hazır görsel tasarım. Dikkat çekici animasyonlar ve premium görünüm.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      color: "#fa709a",
      lightColor: "rgba(250, 112, 154, 0.2)"
    },
    {
      id: 6,
      title: "Fully Responsive",
      subtitle: "Her ekran için optimize",
      content: "Desktop, tablet ve mobil cihazlarda mükemmel görünüm. Responsive tasarım prensipleri ile her ekran boyutunda kusursuz deneyim.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      color: "#a8edea",
      lightColor: "rgba(168, 237, 234, 0.2)"
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="premium-accordion-wrapper">
      <div className="premium-background-animation">
        <div className="premium-bubble premium-bubble-1"></div>
        <div className="premium-bubble premium-bubble-2"></div>
        <div className="premium-bubble premium-bubble-3"></div>
        <div className="premium-bubble premium-bubble-4"></div>
      </div>

      <div className="premium-accordion-container">
        {accordionData.map((item, index) => (
          <div
            className={`premium-accordion-item ${openIndex === index ? "premium-active" : ""}`}
            key={item.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="premium-accordion-header"
              onClick={() => toggleAccordion(index)}
              style={{
                background: openIndex === index ? item.gradient : 'rgba(255, 255, 255, 0.05)',
                borderLeft: `4px solid ${openIndex === index ? item.color : 'transparent'}`,
              }}
            >
              <div className="premium-header-content">
                <div className="premium-number" style={{ 
                  background: openIndex === index ? item.lightColor : 'rgba(255, 255, 255, 0.08)',
                  color: openIndex === index ? item.color : 'rgba(255, 255, 255, 0.6)',
                  borderColor: item.color
                }}>
                  {String(item.id).padStart(2, '0')}
                </div>
                <div className="premium-text-content">
                  <h3 className="premium-title">{item.title}</h3>
                  <p className="premium-subtitle">{item.subtitle}</p>
                </div>
              </div>
              
              <div className={`premium-toggle-icon ${openIndex === index ? "premium-rotate" : ""}`}
                style={{ background: openIndex === index ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 15L7 10H17L12 15Z" 
                    fill="currentColor"
                    className="premium-chevron"
                  />
                </svg>
              </div>

              {hoveredIndex === index && (
                <div className="premium-wave-effect">
                  <span style={{ animationDelay: "0s" }}></span>
                  <span style={{ animationDelay: "0.2s" }}></span>
                  <span style={{ animationDelay: "0.4s" }}></span>
                </div>
              )}
            </div>

            <div className={`premium-accordion-content ${openIndex === index ? "premium-open" : ""}`}>
              <div className="premium-content-inner">
                <div className="premium-content-decorator" style={{ background: item.gradient }}></div>
                <p>{item.content}</p>
                <div className="premium-content-footer">
                  <div className="premium-tag" style={{ borderColor: item.color, color: item.color }}>Premium</div>
                  <div className="premium-tag" style={{ borderColor: item.color, color: item.color }}>Modern</div>
                  <div className="premium-tag" style={{ borderColor: item.color, color: item.color }}>Responsive</div>
                </div>
                <div className="premium-particles">
                  <span style={{ left: "10%", animationDelay: "0s", background: item.color }}></span>
                  <span style={{ left: "25%", animationDelay: "0.2s", background: item.color }}></span>
                  <span style={{ left: "40%", animationDelay: "0.4s", background: item.color }}></span>
                  <span style={{ left: "55%", animationDelay: "0.6s", background: item.color }}></span>
                  <span style={{ left: "70%", animationDelay: "0.8s", background: item.color }}></span>
                  <span style={{ left: "85%", animationDelay: "1s", background: item.color }}></span>
                </div>
              </div>
            </div>

            <div 
              className="premium-glow-line"
              style={{ background: item.gradient }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion4;
