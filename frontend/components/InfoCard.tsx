'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient?: string;
  delay?: number;
}

export default function InfoCard({ 
  title, 
  description, 
  href, 
  icon: Icon,
  gradient = 'from-ocean-blue to-ocean-light',
  delay = 0
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="card p-6 h-full hover:shadow-medium transition-all duration-300">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-semibold text-gray-dark mb-2 group-hover:text-ocean-blue transition-colors">
              {title}
            </h3>
            <p className="text-gray-cool leading-relaxed">
              {description}
            </p>
          </div>

          {/* Hover Arrow */}
          <div className="mt-4 flex items-center text-ocean-blue font-medium opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
            <span className="text-sm">Explore</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}