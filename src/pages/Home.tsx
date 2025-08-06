import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to React + Vite + TypeScript</h1>
        <p className="hero-subtitle">
          A modern web application with routing and API integration
        </p>
      </div>
      
      <div className="features-grid">
        <Card>
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Interactive Portfolio</h3>
            <p>Explore my portfolio with an interactive 2D pixel game and animations</p>
            <Link to="/portfolio" className="feature-link">
              View Portfolio →
            </Link>
          </div>
        </Card>
        
        <Card>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Users Management</h3>
            <p>Browse and view user data fetched from a REST API using Axios</p>
            <Link to="/users" className="feature-link">
              View Users →
            </Link>
          </div>
        </Card>
        
        <Card>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Posts & Content</h3>
            <p>Create, read, and manage posts with full CRUD operations</p>
            <Link to="/posts" className="feature-link">
              View Posts →
            </Link>
          </div>
        </Card>
        
        <Card>
          <div className="feature-card">
            <div className="feature-icon">ℹ️</div>
            <h3>About This App</h3>
            <p>Learn more about the technologies and features used in this application</p>
            <Link to="/about" className="feature-link">
              Learn More →
            </Link>
          </div>
        </Card>
      </div>
      
      <div className="tech-stack">
        <h2>Built With</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-name">React 18</span>
            <span className="tech-desc">Modern UI library</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">TypeScript</span>
            <span className="tech-desc">Type-safe JavaScript</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">Vite 6</span>
            <span className="tech-desc">Fast development server</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">React Router</span>
            <span className="tech-desc">Client-side routing</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">Axios</span>
            <span className="tech-desc">HTTP client library</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">CSS Grid</span>
            <span className="tech-desc">Modern layout system</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
