import React from 'react';
import Card from '../components/Card';

const About: React.FC = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h1>About This Application</h1>
        <p className="page-subtitle">
          A showcase of modern web development technologies and best practices
        </p>
      </div>
      
      <div className="about-grid">
        <Card>
          <div className="feature-detail">
            <div className="feature-icon-large">⚛️</div>
            <h3>React 18</h3>
            <p>Built with the latest version of React, featuring modern hooks, concurrent features, and optimal performance.</p>
            <ul>
              <li>Functional components</li>
              <li>Custom hooks</li>
              <li>Context API</li>
              <li>Concurrent rendering</li>
            </ul>
          </div>
        </Card>
        
        <Card>
          <div className="feature-detail">
            <div className="feature-icon-large">🔥</div>
            <h3>Vite 6</h3>
            <p>Lightning-fast build tool and development server with instant hot module replacement and optimized builds.</p>
            <ul>
              <li>Instant server start</li>
              <li>Lightning fast HMR</li>
              <li>Rich features</li>
              <li>Optimized builds</li>
            </ul>
          </div>
        </Card>
        
        <Card>
          <div className="feature-detail">
            <div className="feature-icon-large">📝</div>
            <h3>TypeScript</h3>
            <p>Type-safe JavaScript that scales, providing better developer experience and fewer runtime errors.</p>
            <ul>
              <li>Static type checking</li>
              <li>IntelliSense support</li>
              <li>Refactoring tools</li>
              <li>Modern ES features</li>
            </ul>
          </div>
        </Card>
        
        <Card>
          <div className="feature-detail">
            <div className="feature-icon-large">🛣️</div>
            <h3>React Router</h3>
            <p>Declarative routing for React applications with dynamic route matching and nested routing support.</p>
            <ul>
              <li>Client-side routing</li>
              <li>Nested routes</li>
              <li>Route parameters</li>
              <li>Navigation guards</li>
            </ul>
          </div>
        </Card>
        
        <Card>
          <div className="feature-detail">
            <div className="feature-icon-large">🌐</div>
            <h3>Axios</h3>
            <p>Promise-based HTTP client with request/response interceptors, automatic request body serialization, and more.</p>
            <ul>
              <li>HTTP interceptors</li>
              <li>Request cancellation</li>
              <li>Automatic transforms</li>
              <li>Error handling</li>
            </ul>
          </div>
        </Card>
        
        <Card>
          <div className="feature-detail">
            <div className="feature-icon-large">🎨</div>
            <h3>Modern CSS</h3>
            <p>Utilizes CSS Grid, Flexbox, and modern CSS features for responsive and beautiful user interfaces.</p>
            <ul>
              <li>CSS Grid layouts</li>
              <li>Flexbox alignment</li>
              <li>Custom properties</li>
              <li>Responsive design</li>
            </ul>
          </div>
        </Card>
      </div>
      
      <Card className="project-info" hover={false}>
        <div className="project-details">
          <h2>🚀 Project Structure</h2>
          <div className="code-structure">
            <pre>
{`src/
├── components/     # Reusable UI components
├── pages/         # Route-based page components
├── services/      # API service functions
├── App.tsx        # Main application component
├── App.css        # Global styles
└── main.tsx       # Application entry point`}
            </pre>
          </div>
          <p>This application demonstrates modern React development patterns including:</p>
          <div className="tech-highlights">
            <span className="tech-badge">Component composition</span>
            <span className="tech-badge">Custom hooks</span>
            <span className="tech-badge">API integration</span>
            <span className="tech-badge">Type safety</span>
            <span className="tech-badge">Responsive design</span>
            <span className="tech-badge">Modern CSS</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
