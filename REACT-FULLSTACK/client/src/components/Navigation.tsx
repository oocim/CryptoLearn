import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Lock, Trophy, Home, Info } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { id: 'home', name: 'Home', icon: Home, path: '/' },
  { id: 'ciphers', name: 'Ciphers', icon: Lock, path: '/ciphers' },
  { id: 'challenges', name: 'Challenges', icon: Trophy, path: '/challenges' },
  { id: 'about', name: 'About', icon: Info, path: '/about' }
];

function Navigation() {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900">CryptoLearn</span>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeRoute === item.path
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveRoute(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

