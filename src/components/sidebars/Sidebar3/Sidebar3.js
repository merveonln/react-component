import React, { useState } from 'react';
import './style.css';

const Sidebar3 = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    {
      id: 'home',
      icon: '🏡',
      label: 'Home',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadowColor: 'rgba(102, 126, 234, 0.6)',
      stats: '2.5K',
      description: 'Main Hub'
    },
    {
      id: 'explore',
      icon: '🔍',
      label: 'Explore',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      shadowColor: 'rgba(240, 147, 251, 0.6)',
      stats: '8.3K',
      description: 'Discover'
    },
    {
      id: 'trending',
      icon: '🔥',
      label: 'Trending',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      shadowColor: 'rgba(250, 112, 154, 0.6)',
      stats: '12K',
      description: 'Hot Now'
    },
    {
      id: 'create',
      icon: '✨',
      label: 'Create',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      shadowColor: 'rgba(79, 172, 254, 0.6)',
      stats: '1.2K',
      description: 'New Post'
    },
    {
      id: 'library',
      icon: '📚',
      label: 'Library',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      shadowColor: 'rgba(67, 233, 123, 0.6)',
      stats: '456',
      description: 'Saved'
    },
    {
      id: 'notifications',
      icon: '🔔',
      label: 'Alerts',
      gradient: 'linear-gradient(135deg, #fa8bff 0%, #2bd2ff 90%, #2bff88 100%)',
      shadowColor: 'rgba(250, 139, 255, 0.6)',
      stats: '23',
      description: 'Updates',
      hasNotification: true
    }
  ];

  return (
    <div className="sidebar3-wrapper">
      {/* Animated Background */}
      <div className="sidebar3-bg-animation">
        <div className="sidebar3-bg-gradient sidebar3-bg-gradient-1"></div>
        <div className="sidebar3-bg-gradient sidebar3-bg-gradient-2"></div>
        <div className="sidebar3-bg-gradient sidebar3-bg-gradient-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="sidebar3-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="sidebar3-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Sidebar Container */}
      <div className="sidebar3-container">
        {/* Header */}
        <div className="sidebar3-header">
          <div className="sidebar3-logo">
            <div className="sidebar3-logo-icon">🚀</div>
            <div className="sidebar3-logo-text">
              <h3>CreativeHub</h3>
              <p>Premium Access</p>
            </div>
          </div>
          <div className="sidebar3-user-avatar">
            <img src="https://i.pravatar.cc/150?img=33" alt="User" />
            <div className="sidebar3-status-dot"></div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sidebar3-nav">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`sidebar3-tab ${activeTab === tab.id ? 'sidebar3-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{ '--tab-index': index }}
            >
              {/* Tab Content */}
              <div className="sidebar3-tab-content">
                <div className="sidebar3-tab-icon-wrapper">
                  <div 
                    className="sidebar3-tab-icon"
                    style={{ 
                      background: activeTab === tab.id || hoveredTab === tab.id 
                        ? tab.gradient 
                        : 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <span>{tab.icon}</span>
                    {tab.hasNotification && (
                      <div className="sidebar3-notification-badge">
                        <div className="sidebar3-notification-ping"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sidebar3-tab-info">
                  <h4>{tab.label}</h4>
                  <p>{tab.description}</p>
                </div>

                <div className="sidebar3-tab-stats">
                  <span>{tab.stats}</span>
                </div>
              </div>

              {/* Animated Border */}
              {activeTab === tab.id && (
                <div 
                  className="sidebar3-active-border"
                  style={{ background: tab.gradient }}
                ></div>
              )}

              {/* Hover Glow */}
              {(hoveredTab === tab.id || activeTab === tab.id) && (
                <div 
                  className="sidebar3-tab-glow"
                  style={{ 
                    background: tab.gradient,
                    boxShadow: `0 0 40px ${tab.shadowColor}`
                  }}
                ></div>
              )}

              {/* Wave Animation */}
              {activeTab === tab.id && (
                <div className="sidebar3-wave">
                  <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                    <path 
                      d="M0,100 Q250,0 500,100 L500,150 L0,150 Z" 
                      fill="url(#wave-gradient)"
                    >
                      <animate 
                        attributeName="d" 
                        dur="3s" 
                        repeatCount="indefinite"
                        values="M0,100 Q250,0 500,100 L500,150 L0,150 Z;
                                M0,100 Q250,150 500,100 L500,150 L0,150 Z;
                                M0,100 Q250,0 500,100 L500,150 L0,150 Z"
                      />
                    </path>
                    <defs>
                      <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(102, 126, 234, 0.3)" />
                        <stop offset="100%" stopColor="rgba(118, 75, 162, 0.3)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="sidebar3-footer">
          <div className="sidebar3-progress-card">
            <div className="sidebar3-progress-header">
              <span className="sidebar3-progress-icon">⚡</span>
              <h4>Weekly Goal</h4>
            </div>
            <div className="sidebar3-progress-bar">
              <div className="sidebar3-progress-fill" style={{ width: '68%' }}>
                <div className="sidebar3-progress-glow"></div>
              </div>
            </div>
            <p className="sidebar3-progress-text">68% Complete</p>
          </div>

          <button className="sidebar3-upgrade-btn">
            <span className="sidebar3-upgrade-icon">👑</span>
            <span className="sidebar3-upgrade-text">Upgrade to Pro</span>
            <div className="sidebar3-upgrade-shine"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar3;
