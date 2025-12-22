"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface MediaStreamContextType {
  localAudioTrack: MediaStreamTrack | null;
  localVideoTrack: MediaStreamTrack | null;
  isLoading: boolean;
  error: string | null;
  micOn: boolean;
  setMicOn: (value: boolean) => void;
  camOn: boolean;
  setCamOn: (value: boolean) => void;
  initializeMedia: () => Promise<void>;
  stopAllTracks: () => void;
}

const MediaStreamContext = createContext<MediaStreamContextType | null>(null);

export const MediaStreamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOnState] = useState(true);
  const [camOn, setCamOnState] = useState(true);
  
  // Track if media has been initialized to prevent duplicate requests
  const isInitialized = useRef(false);
  const isInitializing = useRef(false);

  const initializeMedia = useCallback(async () => {
    // Prevent duplicate initialization
    if (isInitialized.current || isInitializing.current) {
      return;
    }
    
    isInitializing.current = true;
    setIsLoading(true);
    setError(null);

    // 1. Try to get VIDEO
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const videoTrack = videoStream.getVideoTracks()[0];
      setLocalVideoTrack(videoTrack);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied");
      setIsLoading(false);
      isInitializing.current = false;
      return;
    }

    // 2. Try to get AUDIO (independently)
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const audioTrack = audioStream.getAudioTracks()[0];
      setLocalAudioTrack(audioTrack);
    } catch (err) {
      console.error("Mic error:", err);
      // Video still works! Just no mic.
    }

    setIsLoading(false);
    isInitialized.current = true;
    isInitializing.current = false;
  }, []);

  const stopAllTracks = useCallback(() => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      setLocalAudioTrack(null);
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      setLocalVideoTrack(null);
    }
    isInitialized.current = false;
  }, [localAudioTrack, localVideoTrack]);

  // Sync micOn state with track enabled property
  const setMicOn = useCallback((value: boolean) => {
    setMicOnState(value);
    if (localAudioTrack) {
      localAudioTrack.enabled = value;
    }
  }, [localAudioTrack]);

  // Sync camOn state with track enabled property
  const setCamOn = useCallback((value: boolean) => {
    setCamOnState(value);
    if (localVideoTrack) {
      localVideoTrack.enabled = value;
    }
  }, [localVideoTrack]);

  // Update track enabled states when tracks change (for initial sync)
  useEffect(() => {
    if (localAudioTrack) {
      localAudioTrack.enabled = micOn;
    }
  }, [localAudioTrack, micOn]);

  useEffect(() => {
    if (localVideoTrack) {
      localVideoTrack.enabled = camOn;
    }
  }, [localVideoTrack, camOn]);

  // Cleanup on unmount (when user closes tab/navigates away from app)
  useEffect(() => {
    return () => {
      // Only stop tracks when the entire provider unmounts (app closes)
      if (localAudioTrack) {
        localAudioTrack.stop();
      }
      if (localVideoTrack) {
        localVideoTrack.stop();
      }
    };
  }, []);

  return (
    <MediaStreamContext.Provider
      value={{
        localAudioTrack,
        localVideoTrack,
        isLoading,
        error,
        micOn,
        setMicOn,
        camOn,
        setCamOn,
        initializeMedia,
        stopAllTracks,
      }}
    >
      {children}
    </MediaStreamContext.Provider>
  );
};

export const useMediaStreamContext = () => {
  const context = useContext(MediaStreamContext);
  if (!context) {
    throw new Error("useMediaStreamContext must be used within a MediaStreamProvider");
  }
  return context;
};


