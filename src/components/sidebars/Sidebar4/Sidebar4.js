import React, { useState } from 'react';
import './style.css';

const Sidebar4 = () => {
  const [selectedCategory, setSelectedCategory] = useState('music');
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    {
      id: 'music',
      icon: '🎵',
      title: 'Music',
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      items: ['Rock', 'Jazz', 'Electronic'],
      bgPattern: 'music'
    },
    {
      id: 'video',
      icon: '🎬',
      title: 'Videos',
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
      items: ['Tutorials', 'Vlogs', 'Reviews'],
      bgPattern: 'video'
    },
    {
      id: 'photo',
      icon: '📸',
      title: 'Photos',
      color: '#f7b731',
      gradient: 'linear-gradient(135deg, #f7b731 0%, #f39c12 100%)',
      items: ['Portrait', 'Nature', 'Street'],
      bgPattern: 'photo'
    },
    {
      id: 'design',
      icon: '🎨',
      title: 'Design',
      color: '#a55eea',
      gradient: 'linear-gradient(135deg, #a55eea 0%, #8854d0 100%)',
      items: ['UI/UX', 'Branding', '3D'],
      bgPattern: 'design'
    },
    {
      id: 'code',
      icon: '💻',
      title: 'Code',
      color: '#26de81',
      gradient: 'linear-gradient(135deg, #26de81 0%, #20bf6b 100%)',
      items: ['React', 'Node', 'Python'],
      bgPattern: 'code'
    },
    {
      id: 'blog',
      icon: '✍️',
      title: 'Blog',
      color: '#fd79a8',
      gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
      items: ['Tech', 'Lifestyle', 'Travel'],
      bgPattern: 'blog'
    }
  ];

  const activeCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="sidebar4-wrapper">
      {/* Animated Mesh Background */}
      <div className="sidebar4-mesh-bg">
        <div className="sidebar4-mesh-gradient sidebar4-mesh-1"></div>
        <div className="sidebar4-mesh-gradient sidebar4-mesh-2"></div>
        <div className="sidebar4-mesh-gradient sidebar4-mesh-3"></div>
        <div className="sidebar4-mesh-gradient sidebar4-mesh-4"></div>
      </div>

      {/* Glass Morphism Sidebar */}
      <div className="sidebar4-glass-container">
        {/* Top Brand Section */}
        <div className="sidebar4-brand">
          <div className="sidebar4-brand-circle">
            <div className="sidebar4-brand-inner">
              <span className="sidebar4-brand-emoji">⚡</span>
            </div>
          </div>
          <div className="sidebar4-brand-text">
            <h2>MediaHub</h2>
            <div className="sidebar4-brand-badge">
              <span className="sidebar4-badge-dot"></span>
              <span>Premium</span>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="sidebar4-categories">
          {categories.map((category, index) => {
            const isActive = selectedCategory === category.id;
            const isHovered = hoveredItem === category.id;

            return (
              <div
                key={category.id}
                className={`sidebar4-category ${isActive ? 'sidebar4-category-active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                onMouseEnter={() => setHoveredItem(category.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ '--category-index': index }}
              >
                {/* Background Circle */}
                <div 
                  className="sidebar4-category-bg"
                  style={{ 
                    background: isActive || isHovered ? category.gradient : 'transparent'
                  }}
                >
                  {isActive && (
                    <div className="sidebar4-category-ripple"></div>
                  )}
                </div>

                {/* Icon */}
                <div className="sidebar4-category-icon">
                  <span>{category.icon}</span>
                </div>

                {/* Title */}
                <div className="sidebar4-category-title">
                  <h3>{category.title}</h3>
                  <div className="sidebar4-category-count">
                    {category.items.length} items
                  </div>
                </div>

                {/* Chevron */}
                <div className="sidebar4-category-chevron">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M7 5L13 10L7 15" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Animated Border */}
                {isActive && (
                  <div 
                    className="sidebar4-active-line"
                    style={{ background: category.gradient }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Content Preview Panel */}
        <div className="sidebar4-content-panel">
          <div className="sidebar4-panel-header">
            <h3>
              <span className="sidebar4-panel-icon">{activeCategory?.icon}</span>
              {activeCategory?.title}
            </h3>
            <button className="sidebar4-panel-more">⋯</button>
          </div>

          <div className="sidebar4-panel-items">
            {activeCategory?.items.map((item, index) => (
              <div 
                key={index} 
                className="sidebar4-panel-item"
                style={{ 
                  '--item-delay': `${index * 0.1}s`,
                  '--item-color': activeCategory.color
                }}
              >
                <div className="sidebar4-item-dot"></div>
                <span>{item}</span>
                <div className="sidebar4-item-badge">NEW</div>
              </div>
            ))}
          </div>

          <button 
            className="sidebar4-view-all"
            style={{ background: activeCategory?.gradient }}
          >
            <span>View All</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M6 3L11 8L6 13" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Stats Footer */}
        <div className="sidebar4-stats">
          <div className="sidebar4-stat-item">
            <div className="sidebar4-stat-icon">📊</div>
            <div className="sidebar4-stat-info">
              <span className="sidebar4-stat-value">2.4K</span>
              <span className="sidebar4-stat-label">Total</span>
            </div>
          </div>
          <div className="sidebar4-stat-divider"></div>
          <div className="sidebar4-stat-item">
            <div className="sidebar4-stat-icon">⭐</div>
            <div className="sidebar4-stat-info">
              <span className="sidebar4-stat-value">128</span>
              <span className="sidebar4-stat-label">Favorites</span>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="sidebar4-fab">
          <span className="sidebar4-fab-icon">➕</span>
          <div className="sidebar4-fab-ripple"></div>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="sidebar4-decorations">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sidebar4-decoration-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar4;
