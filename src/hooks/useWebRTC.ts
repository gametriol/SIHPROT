import { useState, useCallback } from 'react';

export const useWebRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [isVideoOff, setVideoOff] = useState(false);

  const startVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      return stream;
    } catch (err) {
      console.error('getUserMedia failed', err);
      throw err;
    }
  }, []);

  const toggleMute = useCallback(() => setMuted(v => !v), []);
  const toggleVideo = useCallback(() => setVideoOff(v => !v), []);
  const endCall = useCallback(() => {
    localStream?.getTracks().forEach(t => t.stop());
    setLocalStream(null);
    setRemoteStream(null);
  }, [localStream]);

  return { localStream, remoteStream, isConnected, isMuted, isVideoOff, startVideo, toggleMute, toggleVideo, endCall } as const;
};
