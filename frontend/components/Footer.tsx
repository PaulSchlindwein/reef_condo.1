'use client';

import Link from 'next/link';
import { Waves, Phone, Mail, MapPin, Heart } from 'lucide-react';

const quickLinks = [
  { href: '/condo', label: 'Condo Details' },
  { href: '/resort', label: 'Resort Guide' },
  { href: '/area', label: 'Area Attractions' },
  { href: '/gallery', label: 'Photo Gallery' },
  { href: '/info', label: 'Practical Info' },
];

const contactInfo = [
  { icon: Phone, label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: Mail, label: 'hello@reefcondo.com', href: 'mailto:hello@reefcondo.com' },
  { icon: MapPin, label: 'The Reef Atlantis, Paradise Island', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-dark text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Waves className="h-8 w-8 text-ocean-light" />
              <span className="text-2xl font-heading font-bold">Reef Condo</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your gateway to paradise at the world-renowned Atlantis Resort. Experience luxury, 
              comfort, and unforgettable memories in the heart of Paradise Island.
            </p>
            <div className="flex items-center space-x-1 text-gray-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-coral-accent" />
              <span>for amazing guests</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ocean-light">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ocean-light">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index}>
                    <a 
                      href={contact.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4 text-ocean-light" />
                      <span className="text-sm">{contact.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Reef Condo. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}