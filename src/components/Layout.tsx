import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            React + Vite + TypeScript
          </Link>
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}
            >
              Portfolio
            </Link>
            <Link 
              to="/users" 
              className={`nav-link ${isActive('/users') ? 'active' : ''}`}
            >
              Users
            </Link>
            <Link 
              to="/posts" 
              className={`nav-link ${isActive('/posts') ? 'active' : ''}`}
            >
              Posts
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
