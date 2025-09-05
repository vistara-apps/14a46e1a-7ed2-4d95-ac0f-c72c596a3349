'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'elevated';
  children?: ReactNode;
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  variant = 'default',
  children 
}: FeatureCardProps) {
  const baseClasses = "feature-card";
  const variantClasses = variant === 'elevated' ? 'shadow-depth' : '';

  return (
    <div 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
          
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
