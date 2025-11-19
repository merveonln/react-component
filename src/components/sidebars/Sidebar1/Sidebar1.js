import React, { useState } from 'react';
import './style.css';

const Sidebar1 = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const sidebarItems = [
    { 
      icon: 'home', 
      label: 'Dashboard', 
      description: 'Ana kontrol paneli',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea',
      badge: null
    },
    { 
      icon: 'person', 
      label: 'Profil', 
      description: 'Kullanıcı bilgileri',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb',
      badge: null,
      subItems: [
        { label: 'Bilgilerim', icon: 'account_circle', color: '#f093fb' },
        { label: 'Ayarlar', icon: 'tune', color: '#f5576c' },
        { label: 'Güvenlik', icon: 'security', color: '#ff6b9d' }
      ]
    },
    { 
      icon: 'insert_chart', 
      label: 'İstatistikler', 
      description: 'Veri analizi',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe',
      badge: 'Yeni',
      subItems: [
        { label: 'Genel Bakış', icon: 'dashboard', color: '#4facfe' },
        { label: 'Detaylı Rapor', icon: 'assessment', color: '#00f2fe' },
        { label: 'Grafikler', icon: 'show_chart', color: '#00d4ff' }
      ]
    },
    { 
      icon: 'message', 
      label: 'Mesajlar', 
      description: 'Sohbet merkezi',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: '#fa709a',
      badge: '12'
    },
    { 
      icon: 'group', 
      label: 'Takım', 
      description: 'Ekip yönetimi',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: '#43e97b',
      badge: null
    },
    { 
      icon: 'settings', 
      label: 'Ayarlar', 
      description: 'Sistem ayarları',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      color: '#a8edea',
      badge: null,
      subItems: [
        { label: 'Hesap', icon: 'manage_accounts', color: '#a8edea' },
        { label: 'Görünüm', icon: 'palette', color: '#fbd6e3' },
        { label: 'Bildirimler', icon: 'notifications', color: '#fed6e3' },
        { label: 'Gizlilik', icon: 'privacy_tip', color: '#b8f5ea' }
      ]
    }
  ];

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div className="modern-sidebar-wrapper">
      {/* Background Effects */}
      <div className="modern-sidebar-bg">
        <div className="modern-bg-circle modern-bg-circle-1"></div>
        <div className="modern-bg-circle modern-bg-circle-2"></div>
        <div className="modern-bg-circle modern-bg-circle-3"></div>
      </div>

      <div className={`modern-sidebar ${isExpanded ? 'modern-expanded' : 'modern-collapsed'}`}>
        {/* Header */}
        <div className="modern-sidebar-header">
          <div className="modern-logo-container">
            <div className="modern-logo-icon">
              <span className="material-icons">bolt</span>
              <div className="modern-logo-pulse"></div>
            </div>
            {isExpanded && (
              <div className="modern-logo-text">
                <h2>SIDEBAR<span>PRO</span></h2>
                <p>Premium Edition</p>
              </div>
            )}
          </div>
          
          <button 
            className="modern-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Daralt' : 'Genişlet'}
          >
            <span className="material-icons">
              {isExpanded ? 'chevron_left' : 'chevron_right'}
            </span>
            <div className="modern-toggle-ripple"></div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="modern-sidebar-nav">
          {sidebarItems.map((item, index) => (
            <div key={index} className="modern-nav-group">
              <div 
                className={`modern-sidebar-item ${activeItem === index ? 'modern-active' : ''}`}
                onClick={() => {
                  setActiveItem(index);
                  item.subItems && toggleSubmenu(index);
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="modern-item-content">
                  <div 
                    className="modern-icon-wrapper"
                    style={{ background: activeItem === index ? item.gradient : 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <span className="material-icons modern-sidebar-icon">{item.icon}</span>
                    {activeItem === index && (
                      <div 
                        className="modern-icon-glow"
                        style={{ background: item.color }}
                      ></div>
                    )}
                  </div>
                  
                  {isExpanded && (
                    <div className="modern-item-text">
                      <span className="modern-sidebar-label">{item.label}</span>
                      <span className="modern-sidebar-description">{item.description}</span>
                    </div>
                  )}

                  {isExpanded && item.badge && (
                    <div 
                      className="modern-badge"
                      style={{ background: item.color }}
                    >
                      {item.badge}
                    </div>
                  )}

                  {isExpanded && item.subItems && (
                    <span className={`material-icons modern-expand-icon ${openSubmenu === index ? 'modern-rotated' : ''}`}>
                      expand_more
                    </span>
                  )}
                </div>

                {/* Active Indicator */}
                {activeItem === index && (
                  <div 
                    className="modern-active-line"
                    style={{ background: item.gradient }}
                  ></div>
                )}

                {/* Tooltip for collapsed state */}
                {!isExpanded && hoveredItem === index && (
                  <div className="modern-tooltip">
                    <span>{item.label}</span>
                    {item.badge && <span className="modern-tooltip-badge">{item.badge}</span>}
                  </div>
                )}
              </div>

              {/* Submenu */}
              {item.subItems && isExpanded && openSubmenu === index && (
                <div className="modern-submenu">
                  {item.subItems.map((subItem, subIndex) => (
                    <div 
                      key={subIndex} 
                      className="modern-submenu-item"
                    >
                      <div className="modern-submenu-line" style={{ background: subItem.color }}></div>
                      <span className="material-icons modern-submenu-icon" style={{ color: subItem.color }}>
                        {subItem.icon}
                      </span>
                      <span className="modern-submenu-label">{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="modern-sidebar-footer">
          {isExpanded ? (
            <div className="modern-user-card">
              <div className="modern-user-avatar">
                <span className="material-icons">account_circle</span>
                <div className="modern-status-dot"></div>
              </div>
              <div className="modern-user-info">
                <h4>Merve Önalan</h4>
                <p>Premium User</p>
              </div>
              <button className="modern-logout-btn" title="Çıkış">
                <span className="material-icons">logout</span>
              </button>
            </div>
          ) : (
            <button className="modern-user-avatar-small" title="Profil">
              <span className="material-icons">account_circle</span>
              <div className="modern-status-dot"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar1;