// User types
export interface User {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  locationPreferences: {
    state?: string;
    country?: string;
  };
  languagePreferences: string;
}

// Encounter Record types
export interface EncounterRecord {
  recordId: string;
  userId: string;
  timestamp: Date;
  mediaUrl?: string;
  duration: number;
  notes?: string;
  status: 'recording' | 'saved' | 'shared';
}

// Legal Information types
export interface LegalInfo {
  legalInfoId: string;
  state: string;
  topic: string;
  title: string;
  content: string;
  language: string;
}

// Scenario types for rights scripts
export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'traffic' | 'questioning' | 'search' | 'arrest';
}

// Script types
export interface RightsScript {
  id: string;
  scenarioId: string;
  title: string;
  content: string;
  doSay: string[];
  dontSay: string[];
  keyPoints: string[];
  state?: string;
  language: string;
}

// Recording types
export interface RecordingState {
  isRecording: boolean;
  duration: number;
  mediaUrl?: string;
  startTime?: Date;
}

// Location types
export interface LocationData {
  state: string;
  country: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
