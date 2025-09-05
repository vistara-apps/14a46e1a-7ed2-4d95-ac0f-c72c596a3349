'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { FeatureCard } from '@/components/FeatureCard';
import { RecordButton } from '@/components/RecordButton';
import { ScenarioSelector } from '@/components/ScenarioSelector';
import { LegalScriptView } from '@/components/LegalScriptView';
import { 
  MessageSquare, 
  MapPin, 
  Mic, 
  Globe, 
  BarChart3,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import { Scenario, RightsScript } from '@/lib/types';

type ViewState = 'dashboard' | 'scenarios' | 'script' | 'recording' | 'legal-info';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentScript, setCurrentScript] = useState<RightsScript | null>(null);
  const [userLocation, setUserLocation] = useState<string>('CA');
  
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Mock script data - in a real app, this would come from an API
  const generateScript = (scenario: Scenario): RightsScript => {
    const scripts = {
      'traffic-stop': {
        title: 'Traffic Stop Rights Script',
        content: "Officer, I understand you've stopped me. I will comply with lawful orders. I am exercising my right to remain silent and would like to speak with an attorney. I do not consent to any searches.",
        doSay: [
          '"I am exercising my right to remain silent"',
          '"I would like to speak with an attorney"',
          '"I do not consent to any searches"',
          '"Am I free to go?"'
        ],
        dontSay: [
          "Don't volunteer information about where you're going",
          "Don't admit to any violations",
          "Don't argue or become confrontational",
          "Don't consent to vehicle searches"
        ],
        keyPoints: [
          'Keep your hands visible at all times',
          'Provide license, registration, and insurance when requested',
          'You have the right to remain silent beyond basic identification',
          'You can refuse consent to search your vehicle'
        ]
      },
      'street-questioning': {
        title: 'Street Questioning Rights Script',
        content: 'Officer, I am exercising my right to remain silent. Am I free to go? I do not consent to any searches. I would like to speak with an attorney if I am being detained.',
        doSay: [
          '"Am I free to go?"',
          '"I am exercising my right to remain silent"',
          '"I do not consent to any searches"',
          '"I would like to speak with an attorney"'
        ],
        dontSay: [
          "Don't provide information about your activities",
          "Don't consent to searches of your person or belongings",
          "Don't run or resist physically",
          "Don't lie or provide false information"
        ],
        keyPoints: [
          "You have the right to ask if you're free to go",
          "You don't have to answer questions beyond basic identification",
          'Stay calm and keep your hands visible',
          'You can refuse consent to search'
        ]
      }
    };

    const scriptData = scripts[scenario.id as keyof typeof scripts] || scripts['traffic-stop'];
    
    return {
      id: `${scenario.id}-script`,
      scenarioId: scenario.id,
      title: scriptData.title,
      content: scriptData.content,
      doSay: scriptData.doSay,
      dontSay: scriptData.dontSay,
      keyPoints: scriptData.keyPoints,
      state: userLocation,
      language: 'en'
    };
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    const script = generateScript(scenario);
    setCurrentScript(script);
    setCurrentView('script');
  };

  const handleRecordingComplete = (audioBlob: Blob, duration: number) => {
    console.log('Recording completed:', { duration, size: audioBlob.size });
    // In a real app, you would upload to IPFS via Pinata here
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'scenarios':
        return (
          <ScenarioSelector 
            onScenarioSelect={handleScenarioSelect}
          />
        );
      
      case 'script':
        return currentScript ? (
          <LegalScriptView 
            script={currentScript}
            onBack={() => setCurrentView('dashboard')}
          />
        ) : null;
      
      case 'recording':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Secure Recording
              </h2>
              <p className="text-gray-300">
                Record audio evidence securely and discreetly
              </p>
            </div>
            
            <RecordButton 
              onRecordingComplete={handleRecordingComplete}
            />
            
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        );
      
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-medium">
                Blockchain Dashboard
              </div>
              
              <h1 className="text-4xl font-bold text-white">
                KnowYourRights AI
              </h1>
              
              <p className="text-gray-300 max-w-md mx-auto">
                Your pocket guide to legal rights and police interactions with AI-powered guidance.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => setCurrentView('scenarios')}
                  className="btn-primary"
                >
                  Legal Insights
                </button>
                <button 
                  onClick={() => setCurrentView('scenarios')}
                  className="btn-secondary"
                >
                  Get Help
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-300 text-sm">Available</div>
              </div>
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-gray-300 text-sm">States</div>
              </div>
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-gray-300 text-sm">Languages</div>
              </div>
            </div>

            {/* Legal Features Chart */}
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Legal Features
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Script guidance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                    <span className="text-white text-sm">80%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Script generator</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-3/5 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    </div>
                    <span className="text-white text-sm">60%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Features */}
            <div className="space-y-4">
              <FeatureCard
                title="Interactive Rights Scripts"
                description="Get tailored advice and scripts for common police interactions based on your location and situation."
                icon={MessageSquare}
                onClick={() => setCurrentView('scenarios')}
              />
              
              <FeatureCard
                title="Location-Specific Legal Insights"
                description="Access state-specific laws and procedures relevant to your current location."
                icon={MapPin}
                onClick={() => setCurrentView('legal-info')}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-300">Current location:</span>
                  <span className="text-green-400 font-medium">{userLocation}</span>
                </div>
              </FeatureCard>
              
              <FeatureCard
                title="Secure Recording"
                description="One-tap discreet recording with secure IPFS storage for evidence protection."
                icon={Mic}
                onClick={() => setCurrentView('recording')}
              >
                <button className="btn-primary text-sm mt-2">
                  One Tap
                </button>
              </FeatureCard>
              
              <FeatureCard
                title="Multilingual Support"
                description="Access rights and scripts in multiple languages for broader accessibility."
                icon={Globe}
              >
                <div className="flex flex-wrap gap-2 mt-2">
                  {['EN', 'ES', 'FR', 'ZH', 'AR'].map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-white bg-opacity-10 rounded text-xs text-gray-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </FeatureCard>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Protected</div>
                    <div className="text-gray-300 text-sm">Your rights</div>
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Instant</div>
                    <div className="text-gray-300 text-sm">Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AppShell currentPage="home">
      {renderCurrentView()}
    </AppShell>
  );
}
