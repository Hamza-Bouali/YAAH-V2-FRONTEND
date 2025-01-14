import React, { useEffect, useRef } from "react";

interface VideoCallProps {
  isMicMuted: boolean;
  isVideoOff: boolean;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ isMicMuted, isVideoOff, onEndCall }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    setupStream();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = !isMicMuted;

      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = !isVideoOff;
    }
  }, [isMicMuted, isVideoOff]);

  const handleEndCall = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    onEndCall();
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full rounded-xl"></video>
      <button onClick={handleEndCall} className="mt-4 p-2 bg-red-500 text-white rounded">End Call</button>
    </div>
  );
};

export default VideoCall;
