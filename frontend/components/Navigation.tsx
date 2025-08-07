'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Home, Building, MapPin, Camera, Info, Waves } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/condo', label: 'Condo', icon: Building },
  { href: '/resort', label: 'Resort', icon: Waves },
  { href: '/area', label: 'Area', icon: MapPin },
  { href: '/gallery', label: 'Gallery', icon: Camera },
  { href: '/info', label: 'Info', icon: Info },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sand-warm shadow-soft">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-heading font-bold text-xl text-ocean-blue hover:text-ocean-light transition-colors"
          >
            <Waves className="h-6 w-6" />
            <span className="hidden sm:inline">Reef Condo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-cool hover:text-ocean-blue transition-colors font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:block text-sm text-gray-cool">
            <div className="font-medium">Questions?</div>
            <div className="text-ocean-blue">+1 (555) 123-4567</div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sand-light transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-sand-warm shadow-medium">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-sand-light transition-colors text-gray-cool hover:text-ocean-blue"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Contact */}
              <div className="px-3 py-3 border-t border-sand-warm mt-2">
                <div className="text-sm text-gray-cool">
                  <div className="font-medium">Questions?</div>
                  <div className="text-ocean-blue">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}