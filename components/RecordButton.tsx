'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface RecordButtonProps {
  onRecordingComplete?: (audioBlob: Blob, duration: number) => void;
  variant?: 'recording' | 'idle';
}

export function RecordButton({ onRecordingComplete, variant = 'idle' }: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        onRecordingComplete?.(blob, duration);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (audioBlob && !isRecording) {
    return (
      <div className="space-y-4">
        <div className="glass-card p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-primary font-medium">Recording Complete</p>
              <p className="text-text-secondary text-sm">Duration: {formatDuration(duration)}</p>
            </div>
            
            <button
              onClick={isPlaying ? pauseRecording : playRecording}
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
          </div>
        </div>
        
        <button
          onClick={() => {
            setAudioBlob(null);
            setDuration(0);
          }}
          className="w-full btn-secondary"
        >
          Record New
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
          isRecording
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
        }`}
      >
        {isRecording ? (
          <Square className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
      
      {isRecording && (
        <div className="space-y-2">
          <p className="text-text-primary font-medium">Recording...</p>
          <p className="text-text-secondary text-lg font-mono">
            {formatDuration(duration)}
          </p>
        </div>
      )}
      
      {!isRecording && (
        <p className="text-text-secondary">
          Tap to start secure recording
        </p>
      )}
    </div>
  );
}
