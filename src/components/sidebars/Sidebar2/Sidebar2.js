import React, { useState } from 'react';
import './style.css';

const Sidebar2 = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 1,
      icon: '🏠',
      label: 'Dashboard',
      description: 'Ana kontrol paneli',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea',
      notifications: 0
    },
    {
      id: 2,
      icon: '📊',
      label: 'Analytics',
      description: 'Veri analizi ve raporlar',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb',
      notifications: 5
    },
    {
      id: 3,
      icon: '💬',
      label: 'Messages',
      description: 'Mesajlaşma merkezi',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe',
      notifications: 12
    },
    {
      id: 4,
      icon: '👥',
      label: 'Team',
      description: 'Takım yönetimi',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: '#43e97b',
      notifications: 3
    },
    {
      id: 5,
      icon: '⚙️',
      label: 'Settings',
      description: 'Sistem ayarları',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: '#fa709a',
      notifications: 0
    },
    {
      id: 6,
      icon: '📁',
      label: 'Projects',
      description: 'Proje yönetimi',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      color: '#a8edea',
      notifications: 8
    },
    {
      id: 7,
      icon: '🔔',
      label: 'Notifications',
      description: 'Bildirim merkezi',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      color: '#fcb69f',
      notifications: 99
    }
  ];

  return (
    <div className="floating-sidebar-container">
      {/* Background Effects */}
      <div className="floating-bg-effects">
        <div className="floating-glow floating-glow-1"></div>
        <div className="floating-glow floating-glow-2"></div>
        <div className="floating-glow floating-glow-3"></div>
      </div>

      {/* Sidebar */}
      <aside className="floating-sidebar">
        {/* Logo */}
        <div className="floating-logo">
          <div className="floating-logo-icon">
            <span className="floating-logo-text">S2</span>
            <div className="floating-logo-ring"></div>
            <div className="floating-logo-ring floating-logo-ring-2"></div>
          </div>
          <div className="floating-logo-label">
            <h3>Sidebar2</h3>
            <p>Premium Menu</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="floating-nav">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`floating-nav-item ${activeItem === index ? 'floating-active' : ''}`}
              onClick={() => setActiveItem(index)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="floating-nav-content">
                <div 
                  className="floating-nav-icon"
                  style={{
                    background: activeItem === index ? item.gradient : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <span className="floating-icon-emoji">{item.icon}</span>
                  {activeItem === index && (
                    <div 
                      className="floating-icon-glow"
                      style={{ background: item.color }}
                    ></div>
                  )}
                </div>
                
                <div className="floating-nav-text">
                  <span className="floating-nav-label">{item.label}</span>
                  <span className="floating-nav-description">{item.description}</span>
                </div>

                {item.notifications > 0 && (
                  <div 
                    className="floating-notification-badge"
                    style={{ background: item.color }}
                  >
                    {item.notifications > 99 ? '99+' : item.notifications}
                  </div>
                )}
              </div>

              {/* Active Indicator */}
              {activeItem === index && (
                <div 
                  className="floating-active-indicator"
                  style={{ background: item.gradient }}
                ></div>
              )}

              {/* Hover Effect */}
              {hoveredItem === index && (
                <div 
                  className="floating-hover-effect"
                  style={{ 
                    background: `${item.color}15`,
                    borderColor: item.color
                  }}
                ></div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="floating-footer">
          <div className="floating-user-profile">
            <div className="floating-avatar">
              <span>👤</span>
              <div className="floating-status-indicator"></div>
            </div>
            <div className="floating-user-info">
              <h4>John Doe</h4>
              <p>Premium User</p>
            </div>
          </div>
          
          <button className="floating-logout-btn">
            <span>🚪</span>
          </button>
        </div>
      </aside>

      {/* Main Content Preview */}
      <div className="floating-content-preview">
        <div className="floating-preview-header">
          <h2>Welcome to Sidebar2</h2>
          <p>Modern floating sidebar with glassmorphism design</p>
        </div>
        
        <div className="floating-preview-cards">
          {[1, 2, 3].map((card) => (
            <div key={card} className="floating-preview-card">
              <div className="floating-card-icon">✨</div>
              <h3>Feature {card}</h3>
              <p>Premium glassmorphism design with smooth animations</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar2;
