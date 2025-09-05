import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'traffic-stop',
    title: 'Traffic Stop',
    description: 'Pulled over by police while driving',
    icon: 'car',
    category: 'traffic'
  },
  {
    id: 'street-questioning',
    title: 'Street Questioning',
    description: 'Approached by police on the street',
    icon: 'user',
    category: 'questioning'
  },
  {
    id: 'search-request',
    title: 'Search Request',
    description: 'Police want to search you or your property',
    icon: 'search',
    category: 'search'
  },
  {
    id: 'arrest-situation',
    title: 'Arrest Situation',
    description: 'Being arrested or detained',
    icon: 'handcuffs',
    category: 'arrest'
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文' },
  { code: 'ar', name: 'العربية' }
];

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const LEGAL_TOPICS = [
  'Fourth Amendment Rights',
  'Fifth Amendment Rights',
  'Miranda Rights',
  'Search and Seizure',
  'Traffic Stop Procedures',
  'Arrest Procedures',
  'Right to Remain Silent',
  'Right to an Attorney',
  'Consent to Search',
  'Stop and Frisk'
];
