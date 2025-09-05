import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    });
  });
}

export function getStateFromCoordinates(lat: number, lng: number): Promise<string> {
  // This would typically use a reverse geocoding service
  // For demo purposes, returning a default state
  return Promise.resolve('CA');
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function shareContent(title: string, text: string, url?: string) {
  if (navigator.share) {
    return navigator.share({
      title,
      text,
      url
    });
  } else {
    // Fallback to clipboard
    return navigator.clipboard.writeText(`${title}\n\n${text}${url ? `\n\n${url}` : ''}`);
  }
}
