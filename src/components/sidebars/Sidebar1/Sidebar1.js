import React, { useState } from 'react';
import './style.css';

const Sidebar1 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const sidebarItems = [
    { 
      icon: 'home', 
      label: 'Ana Sayfa', 
      gradient: 'from-blue-400 to-purple-500' 
    },
    { 
      icon: 'person', 
      label: 'Profil', 
      gradient: 'from-pink-400 to-red-500',
      subItems: [
        { label: 'Bilgilerim', icon: 'adjust' },
        { label: 'Ayarlar', icon: 'adjust' }
      ]
    },
    { 
      icon: 'insert_chart', 
      label: 'İstatistikler', 
      gradient: 'from-green-400 to-teal-500',
      subItems: [
        { label: 'Genel', icon: 'adjust' },
        { label: 'Detaylı Rapor', icon: 'adjust' }
      ]
    },
    { 
      icon: 'message', 
      label: 'Mesajlar', 
      gradient: 'from-yellow-400 to-orange-500' 
    },
    { 
      icon: 'settings', 
      label: 'Ayarlar', 
      gradient: 'from-indigo-400 to-blue-500',
      subItems: [
        { label: 'Hesap', icon: 'adjust' },
        { label: 'Görünüm', icon: 'adjust' },
        { label: 'Bildirimler', icon: 'adjust' }
      ]
    }
  ];

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div className={`material-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isExpanded && <h2 className="logo">SİDEBAR1</h2>}
        <button 
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="material-icons">
            {isExpanded ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <div 
              className={`sidebar-item ${activeItem === index ? 'active' : ''}`}
              onClick={() => {
                setActiveItem(index);
                item.subItems && toggleSubmenu(index);
              }}
            >
              <div className={`icon-wrapper bg-gradient-to-r ${item.gradient}`}>
                <span className="material-icons sidebar-icon">{item.icon}</span>
              </div>
              {isExpanded && (
                <div className="flex items-center w-full justify-between">
                  <span className="sidebar-label">{item.label}</span>
                  {item.subItems && isExpanded && (
                    <span className="material-icons text-sm">
                      {openSubmenu === index ? 'expand_less' : 'expand_more'}
                    </span>
                  )}
                </div>
              )}
            </div>

            {item.subItems && isExpanded && openSubmenu === index && (
              <div className="submenu">
                {item.subItems.map((subItem, subIndex) => (
                  <div 
                    key={subIndex} 
                    className="submenu-item"
                  >
                    <span className="material-icons submenu-icon">{subItem.icon}</span>
                    <span className="submenu-label">{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar1;