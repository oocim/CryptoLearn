import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Lock, Trophy, Home, Info } from 'lucide-react';

const navigation = [
  { id: 'home', name: 'Home', icon: Home, path: '/' },
  { id: 'ciphers', name: 'Ciphers', icon: Lock, path: '/ciphers' },
  { id: 'challenges', name: 'Challenges', icon: Trophy, path: '/challenges' },
  { id: 'about', name: 'About', icon: Info, path: '/about' }
];

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo" onClick={() => window.location.href = '/'}>
          <BookOpen className="logo-icon" />
          <span className="logo-text">CryptoLearn</span>
        </div>
        <div className="nav-links">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;