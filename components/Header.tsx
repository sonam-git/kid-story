'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Plus, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    router.push('/login');
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  // Navigation items
  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: Home,
      show: true,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
    },
    {
      label: 'My Stories',
      path: '/my-stories',
      icon: BookOpen,
      show: true,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200',
    },
    {
      label: 'All Stories',
      path: '/stories',
      icon: Sparkles,
      show: true,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      hoverColor: 'hover:bg-pink-200',
    },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-purple-300">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigateTo('/')}
          >
            <div className="relative">
              <Image 
                src="/logo/ks-transparent-logo.png" 
                alt="ImagiKids" 
                width={50} 
                height={50}
                className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
            </div>
            {/* Show on all screen sizes */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                Imagi Kids
              </h1>
              <p className="text-xs text-gray-500 font-medium">Create Amazing Stories! ✨</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return item.show ? (
                <button
                  key={item.path}
                  onClick={() => navigateTo(item.path)}
                  className={`
                    ${isActive(item.path) ? item.bgColor : 'bg-gray-50'} 
                    ${item.color} 
                    ${item.hoverColor}
                    px-4 py-2.5 rounded-full font-bold transition-all 
                    flex items-center gap-2 shadow-md hover:shadow-xl 
                    hover:scale-105 active:scale-95
                    ${isActive(item.path) ? 'ring-2 ring-offset-2 ring-purple-400' : ''}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ) : null;
            })}

            {/* Create Story Button */}
            <button
              onClick={() => navigateTo('/?create=true')}
              className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Story</span>
            </button>

            {/* User Menu */}
            {user && (
              <div className="flex items-center gap-3 ml-2 pl-3 border-l-2 border-gray-200">
                <div className="hidden lg:block text-right">
                  <p className="text-sm font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-10 h-10 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-100 text-red-600 px-4 py-2.5 rounded-full font-bold hover:bg-red-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden xl:inline">Logout</span>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden bg-purple-100 text-purple-600 p-3 rounded-full hover:bg-purple-200 transition-all active:scale-95 shadow-lg"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 animate-fadeIn">
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-3xl p-4 space-y-2 shadow-xl border-4 border-purple-200">
              {/* User Info on Mobile */}
              {user && (
                <div className="bg-white rounded-2xl p-4 mb-3 flex items-center gap-3 shadow-md">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return item.show ? (
                  <button
                    key={item.path}
                    onClick={() => navigateTo(item.path)}
                    className={`
                      w-full ${isActive(item.path) ? item.bgColor : 'bg-white'} 
                      ${item.color} 
                      px-5 py-4 rounded-2xl font-bold transition-all 
                      flex items-center gap-3 shadow-md hover:shadow-xl 
                      active:scale-95
                      ${isActive(item.path) ? 'ring-2 ring-purple-400' : ''}
                    `}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-lg">{item.label}</span>
                  </button>
                ) : null;
              })}

              {/* Create Story Button - Mobile */}
              <button
                onClick={() => navigateTo('/?create=true')}
                className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white px-5 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all active:scale-95 flex items-center gap-3 justify-center"
              >
                <Plus className="w-6 h-6" />
                <span className="text-lg">Create New Story</span>
              </button>

              {/* Logout Button - Mobile */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-100 text-red-600 px-5 py-4 rounded-2xl font-bold hover:bg-red-200 transition-all active:scale-95 flex items-center gap-3 justify-center mt-3"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg">Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add CSS for fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
