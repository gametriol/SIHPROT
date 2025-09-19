// import React, { useState } from 'react';
// import { VideoCall } from "./video/VideoCall";
// import { Video, Calendar, Clock, FileText, MessageCircle, Upload, Phone, PhoneOff, Mic, MicOff, VideoIcon, VideoOff, Settings } from 'lucide-react';

// interface Consultation {
//   id: string;
//   doctorName: string;
//   specialty: string;
//   scheduledDate: string;
//   scheduledTime: string;
//   status: 'upcoming' | 'in-progress' | 'completed';
//   duration: string;
//   notes?: string;
//   prescription?: string;
// }

// const mockConsultations: Consultation[] = [
//   {
//     id: '1',
//     doctorName: 'Dr. Sarah Wilson',
//     specialty: 'Cardiologist',
//     scheduledDate: '2024-03-15',
//     scheduledTime: '2:00 PM',
//     status: 'upcoming',
//     duration: '30 min'
//   },
//   {
//     id: '2',
//     doctorName: 'Dr. Michael Chen',
//     specialty: 'General Physician',
//     scheduledDate: '2024-03-10',
//     scheduledTime: '10:30 AM',
//     status: 'completed',
//     duration: '25 min',
//     notes: 'Patient reported feeling better. Continue current medication.',
//     prescription: 'Paracetamol 500mg - 2 times daily for 5 days'
//   }
// ];

// const VideoConsultation: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'join'>('upcoming');
//   const [inCall, setInCall] = useState(false);
//   const [micOn, setMicOn] = useState(true);
//   const [videoOn, setVideoOn] = useState(true);

//   const renderUpcoming = () => (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-900">Upcoming Consultations</h2>
      
//       {mockConsultations
//         .filter(consultation => consultation.status === 'upcoming')
//         .map((consultation) => (
//           <div key={consultation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-blue-100 rounded-lg">
//                   <Video className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">{consultation.doctorName}</h3>
//                   <p className="text-gray-600">{consultation.specialty}</p>
//                   <div className="flex items-center mt-2 space-x-4">
//                     <div className="flex items-center text-gray-500">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       <span className="text-sm">{consultation.scheduledDate}</span>
//                     </div>
//                     <div className="flex items-center text-gray-500">
//                       <Clock className="w-4 h-4 mr-1" />
//                       <span className="text-sm">{consultation.scheduledTime}</span>
//                     </div>
//                     <span className="text-sm text-gray-500">Duration: {consultation.duration}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 lg:mt-0 flex space-x-2">
//                 <button 
//                   onClick={() => setActiveTab('join')}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
//                 >
//                   Join Now
//                 </button>
//                 <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                   Reschedule
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );

//   const renderHistory = () => (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-900">Consultation History</h2>
      
//       {mockConsultations
//         .filter(consultation => consultation.status === 'completed')
//         .map((consultation) => (
//           <div key={consultation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-gray-100 rounded-lg">
//                   <Video className="w-6 h-6 text-gray-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">{consultation.doctorName}</h3>
//                   <p className="text-gray-600">{consultation.specialty}</p>
//                   <div className="flex items-center mt-1 space-x-4">
//                     <span className="text-sm text-gray-500">{consultation.scheduledDate} at {consultation.scheduledTime}</span>
//                     <span className="text-sm text-gray-500">Duration: {consultation.duration}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                 Completed
//               </div>
//             </div>
            
//             {consultation.notes && (
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">Doctor's Notes</h4>
//                 <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{consultation.notes}</p>
//               </div>
//             )}
            
//             {consultation.prescription && (
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">Prescription</h4>
//                 <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">{consultation.prescription}</p>
//               </div>
//             )}
            
//             <div className="flex space-x-2">
//               <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                 Download Report
//               </button>
//               <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                 Book Follow-up
//               </button>
//             </div>
//           </div>
//         ))}
//     </div>
//   );

//   const renderJoinConsultation = () => {
//     if (inCall) {
//       return (
//         <div className="space-y-6">
//           <div className="bg-gray-900 rounded-xl overflow-hidden relative" style={{ height: '400px' }}>
//             {/* Video Call Interface */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center text-white">
//                 <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                 <p className="text-lg">Connected to Dr. Sarah Wilson</p>
//                 <p className="text-sm opacity-75">Cardiology Consultation</p>
//               </div>
//             </div>
            
//             {/* Call Controls */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
//               <button
//                 onClick={() => setMicOn(!micOn)}
//                 className={`p-3 rounded-full transition-colors duration-200 ${
//                   micOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
//                 }`}
//               >
//                 {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
//               </button>
              
//               <button
//                 onClick={() => setVideoOn(!videoOn)}
//                 className={`p-3 rounded-full transition-colors duration-200 ${
//                   videoOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
//                 }`}
//               >
//                 {videoOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
//               </button>
              
//               <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-200">
//                 <Settings className="w-5 h-5" />
//               </button>
              
//               <button
//                 onClick={() => setInCall(false)}
//                 className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
//               >
//                 <PhoneOff className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
          
//           {/* Chat and File Upload */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Chat</h3>
//               <div className="h-48 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
//                 <div className="space-y-2">
//                   <div className="text-sm">
//                     <span className="font-medium text-blue-600">Dr. Wilson:</span>
//                     <span className="text-gray-600 ml-2">Hello, how are you feeling today?</span>
//                   </div>
//                   <div className="text-sm">
//                     <span className="font-medium text-green-600">You:</span>
//                     <span className="text-gray-600 ml-2">Much better than last week, thank you.</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <input
//                   type="text"
//                   placeholder="Type your message..."
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200">
//                   Send
//                 </button>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Files</h3>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors duration-200">
//                 <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600 mb-2">Upload lab reports, X-rays, or other documents</p>
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                   Choose Files
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         <h2 className="text-2xl font-semibold text-gray-900">Join Video Consultation</h2>
        
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
//           <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Video className="w-12 h-12 text-blue-600" />
//           </div>
          
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to join your consultation?</h3>
//           <p className="text-gray-600 mb-2">Dr. Sarah Wilson - Cardiology</p>
//           <p className="text-sm text-gray-500 mb-6">Scheduled for Today at 2:00 PM</p>
          
//           <div className="flex items-center justify-center space-x-4 mb-8">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Camera ready</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Microphone ready</span>
//             </div>
//           </div>
          
//           <button
//             onClick={() => setInCall(true)}
//             className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-medium"
//           >
//             Join Consultation
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <h1 className="text-3xl font-bold text-gray-900">Video Consultation</h1>
//         <button className="mt-4 sm:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
//           Schedule New Consultation
//         </button>
//       </div>

//       {/* Tab Navigation */}
//       <div className="border-b border-gray-200">
//         <nav className="-mb-px flex space-x-8">
//           <button
//             onClick={() => setActiveTab('upcoming')}
//             className={`py-2 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'upcoming'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             } transition-colors duration-200`}
//           >
//             Upcoming
//           </button>
//           <button
//             onClick={() => setActiveTab('history')}
//             className={`py-2 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'history'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             } transition-colors duration-200`}
//           >
//             History
//           </button>
//           <button
//             onClick={() => setActiveTab('join')}
//             className={`py-2 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'join'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             } transition-colors duration-200`}
//           >
//             Join Now
//           </button>
//         </nav>
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'upcoming' && renderUpcoming()}
//       {activeTab === 'history' && renderHistory()}
//       {activeTab === 'join' && renderJoinConsultation()}
//     </div>
//   );
// };

// export default VideoConsultation;


import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { VideoCall } from "./video/VideoCall";

const VideoConsultation = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [inCall, setInCall] = useState(false);

  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2024-03-15",
      time: "10:00 AM",
      status: "Scheduled",
    },
  ];

  const pastConsultations = [
    {
      id: 1,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2024-02-20",
      time: "2:30 PM",
      notes: "Prescribed topical treatment",
    },
  ];

  const renderUpcomingConsultations = () => (
    <div className="space-y-4">
      {upcomingConsultations.map((consultation) => (
        <div
          key={consultation.id}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {consultation.doctor}
              </h3>
              <p className="text-sm text-gray-600">{consultation.specialty}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {consultation.date}
                <Clock className="w-4 h-4 ml-3 mr-1" />
                {consultation.time}
              </div>
            </div>
            <button
              onClick={() => setActiveTab("join")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Join Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPastConsultations = () => (
    <div className="space-y-4">
      {pastConsultations.map((consultation) => (
        <div
          key={consultation.id}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {consultation.doctor}
          </h3>
          <p className="text-sm text-gray-600">{consultation.specialty}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {consultation.date}
            <Clock className="w-4 h-4 ml-3 mr-1" />
            {consultation.time}
          </div>
          <p className="mt-2 text-sm text-gray-700">{consultation.notes}</p>
        </div>
      ))}
    </div>
  );

  const renderJoinConsultation = () => {
    if (inCall) {
      return (
        <div className="space-y-6">
          {/* Hardcoded video call room */}
          <VideoCall roomId="demo-room" />
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Your consultation with Dr. Sarah Wilson is about to begin
        </h3>
        <p className="text-gray-600">Cardiology Specialist</p>
        <button
          onClick={() => setInCall(true)}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-medium"
        >
          Join Consultation
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "upcoming"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "past"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
        >
          Past
        </button>
        <button
          onClick={() => setActiveTab("join")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "join"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border border-gray-200"
          }`}
        >
          Join Consultation
        </button>
      </div>

      {activeTab === "upcoming" && renderUpcomingConsultations()}
      {activeTab === "past" && renderPastConsultations()}
      {activeTab === "join" && renderJoinConsultation()}
    </div>
  );
};

export default VideoConsultation;
