'use client';

import { Car, User, Search, Shield } from 'lucide-react';
import { Scenario } from '@/lib/types';
import { SCENARIOS } from '@/lib/constants';

interface ScenarioSelectorProps {
  onScenarioSelect: (scenario: Scenario) => void;
}

const iconMap = {
  car: Car,
  user: User,
  search: Search,
  handcuffs: Shield
};

export function ScenarioSelector({ onScenarioSelect }: ScenarioSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Select Your Situation
        </h2>
        <p className="text-gray-300">
          Choose the scenario that best matches your current situation
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {SCENARIOS.map((scenario) => {
          const Icon = iconMap[scenario.icon as keyof typeof iconMap] || User;
          
          return (
            <button
              key={scenario.id}
              onClick={() => onScenarioSelect(scenario)}
              className="feature-card text-left hover:scale-105 transform transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {scenario.description}
                  </p>
                </div>
                
                <div className="text-gray-300">
                  <span className="text-2xl">→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <div>
            <p className="text-white font-medium">Emergency?</p>
            <p className="text-gray-300 text-sm">
              If you're in immediate danger, call 911 first
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
