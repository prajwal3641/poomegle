"use client";

import { useEffect } from "react";
import { useMediaStreamContext } from "@/context/MediaStreamContext";

/**
 * Hook to access and manage local media streams.
 * Uses a shared context so streams are created once and reused across pages.
 * 
 * Call this hook in any component that needs access to camera/microphone.
 * The first component to call it will trigger media initialization.
 */
export const useMediaStream = () => {
  const {
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
  } = useMediaStreamContext();

  // Auto-initialize media when hook is first used
  useEffect(() => {
    initializeMedia();
  }, [initializeMedia]);

  return {
    localAudioTrack,
    localVideoTrack,
    isLoading,
    error,
    micOn,
    setMicOn,
    camOn,
    setCamOn,
    // Expose these for advanced use cases
    initializeMedia,
    stopAllTracks,
  };
};
