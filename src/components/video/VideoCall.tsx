// import React, { useEffect, useRef } from 'react';
// import { Phone, Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
// import { useWebRTC } from '../../hooks/useWebRTC';
// import { useSocket } from '../../hooks/useSocket';

// interface VideoCallProps { roomId: string }

// export const VideoCall: React.FC<VideoCallProps> = ({ roomId }) => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const { localStream, remoteStream, isConnected, isMuted, isVideoOff, startVideo, toggleMute, toggleVideo, endCall } = useWebRTC();
//   const { socket, isConnected: socketConnected } = useSocket();

//   useEffect(() => { if (localVideoRef.current && (localStream as any)) localVideoRef.current.srcObject = localStream; }, [localStream]);
//   useEffect(() => { if (remoteVideoRef.current && (remoteStream as any)) remoteVideoRef.current.srcObject = remoteStream; }, [remoteStream]);

//   useEffect(() => {
//     const initializeCall = async () => {
//       try {
//         await startVideo();
//         if (socket) socket.emit('join-room', roomId);
//       } catch (error) { console.error('Failed to start video:', error); }
//     };
//     initializeCall();
//     return () => endCall();
//   }, [roomId]);

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
//         <div className="bg-gray-800 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-white font-semibold">Video Consultation</h2>
//               <p className="text-gray-300 text-sm">Room: {roomId} • {socketConnected ? 'Connected' : 'Connecting...'}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
//               <span className="text-white text-sm">{socketConnected ? 'Online' : 'Offline'}</span>
//             </div>
//           </div>
//         </div>

//         <div className="relative bg-gray-900 aspect-video">
//           <div className="w-full h-full">
//             {remoteStream ? (
//               <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                 <div className="text-center text-white">
//                   <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Video className="w-12 h-12 text-gray-400" />
//                   </div>
//                   <p className="text-lg font-medium">Waiting for participant to join...</p>
//                   <p className="text-gray-400">They will be notified via SMS/WhatsApp</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
//             {localStream ? (
//               <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center"><Video className="w-8 h-8 text-gray-400" /></div>
//             )}
//             <div className="absolute bottom-2 left-2"><span className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">You</span></div>
//           </div>

//           {!socketConnected && (
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <div className="bg-black bg-opacity-75 text-white px-6 py-4 rounded-lg text-center">
//                 <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
//                 <p>Connecting to server...</p>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="bg-gray-800 px-6 py-4">
//           <div className="flex justify-center space-x-4">
//             <button onClick={toggleMute} className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`} title={isMuted ? 'Unmute' : 'Mute'}>{isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}</button>
//             <button onClick={toggleVideo} className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`} title={isVideoOff ? 'Turn on video' : 'Turn off video'}>{isVideoOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}</button>
//             <button onClick={endCall} className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors" title="End call"><PhoneOff className="w-5 h-5 text-white" /></button>
//           </div>
//         </div>

//         <div className="bg-gray-700 px-6 py-3">
//           <div className="flex justify-between items-center text-sm text-gray-300">
//             <span>Anonymous secure connection</span>
//             <div className="flex items-center space-x-4">
//               <span>Audio: {isMuted ? 'Muted' : 'Active'}</span>
//               <span>Video: {isVideoOff ? 'Off' : 'Active'}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useRef } from "react";
import {
  Phone,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
} from "lucide-react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useSocket } from "../../hooks/useSocket";

export const VideoCall: React.FC = () => {
  const roomId = "demo-room"; // 👈 Hardcoded room name

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const {
    localStream,
    remoteStream,
    isMuted,
    isVideoOff,
    startVideo,
    toggleMute,
    toggleVideo,
    endCall,
  } = useWebRTC();

  const { socket, isConnected: socketConnected } = useSocket();

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        await startVideo();
        if (socket) {
          socket.emit("join-room", { roomId, role: "doctor" });
          // or role: "patient" depending on who is joining
        }
      } catch (error) {
        console.error("Failed to start video:", error);
      }
    };
    initializeCall();
    return () => endCall();
  }, [socket]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
        <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-white font-semibold">Video Consultation</h2>
            <p className="text-gray-300 text-sm">
              Room: {roomId} • {socketConnected ? "Connected" : "Connecting..."}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                socketConnected ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>
            <span className="text-white text-sm">
              {socketConnected ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <div className="relative bg-gray-900 aspect-video">
          <div className="w-full h-full">
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                <p>Waiting for other participant...</p>
              </div>
            )}
          </div>

          {/* Local video */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
            {localStream ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <VideoIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="absolute bottom-2 left-2">
              <span className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                You
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 px-6 py-4 flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full ${
              isMuted ? "bg-red-600" : "bg-gray-600"
            } transition-colors`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoOff ? "bg-red-600" : "bg-gray-600"
            } transition-colors`}
            title={isVideoOff ? "Turn on video" : "Turn off video"}
          >
            {isVideoOff ? (
              <VideoOff className="w-5 h-5 text-white" />
            ) : (
              <VideoIcon className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={endCall}
            className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
            title="End call"
          >
            <PhoneOff className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
