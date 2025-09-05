'use client';

import { useState } from 'react';
import { Share2, Copy, Volume2, ChevronLeft } from 'lucide-react';
import { RightsScript } from '@/lib/types';
import { shareContent } from '@/lib/utils';

interface LegalScriptViewProps {
  script: RightsScript;
  onBack?: () => void;
}

export function LegalScriptView({ script, onBack }: LegalScriptViewProps) {
  const [activeTab, setActiveTab] = useState<'script' | 'do' | 'dont'>('script');

  const handleShare = async () => {
    try {
      await shareContent(
        script.title,
        script.content,
        window.location.href
      );
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.content);
      // You could add a toast notification here
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(script.content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSpeak}
            className="p-2 glass-card rounded-lg hover:bg-opacity-15 transition-all duration-200"
          >
            <Volume2 className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 glass-card rounded-lg hover:bg-opacity-15 transition-all duration-200"
          >
            <Copy className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 glass-card rounded-lg hover:bg-opacity-15 transition-all duration-200"
          >
            <Share2 className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          {script.title}
        </h1>
        {script.state && (
          <p className="text-gray-300">
            Specific to {script.state} law
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-lg p-1">
        <div className="flex space-x-1">
          {[
            { id: 'script', label: 'Script' },
            { id: 'do', label: 'Do Say' },
            { id: 'dont', label: "Don't Say" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="glass-card rounded-lg p-6">
        {activeTab === 'script' && (
          <div className="space-y-4">
            <p className="text-white leading-relaxed">
              {script.content}
            </p>
            
            {script.keyPoints.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Key Points to Remember:
                </h3>
                <ul className="space-y-2">
                  {script.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'do' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              What TO Say:
            </h3>
            <ul className="space-y-3">
              {script.doSay.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'dont' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              What NOT to Say:
            </h3>
            <ul className="space-y-3">
              {script.dontSay.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✕</span>
                  </div>
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Emergency Actions */}
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">
          Emergency Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="btn-primary text-sm py-2">
            Call Attorney
          </button>
          <button className="btn-secondary text-sm py-2">
            Start Recording
          </button>
        </div>
      </div>
    </div>
  );
}
