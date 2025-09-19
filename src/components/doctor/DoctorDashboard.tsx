import React, { useState } from 'react';
import { Calendar, Users, FileText, Clock, Activity, Video } from 'lucide-react';
import { VideoCall } from '../video/VideoCall';
import { SlotManagement } from './SlotManagement';
import { PatientQueue } from './PatientQueue';
import { PrescriptionManager } from './PrescriptionManager';

export const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const todayStats = {
    totalPatients: 8,
    completed: 5,
    upcoming: 2,
    ongoing: 1,
  };

  const upcomingAppointments = [
    { id: '1', patientName: 'Patient #1234', time: '2:00 PM', symptoms: 'Fever and cough for 3 days', status: 'scheduled' as const },
    { id: '2', patientName: 'Patient #5678', time: '2:30 PM', symptoms: 'Joint pain in knees', status: 'ongoing' as const },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'slots':
        return <SlotManagement />;
      case 'queue':
        return <PatientQueue />;
      case 'prescriptions':
        return <PrescriptionManager />;
      case 'video':
        return <VideoCall roomId="doctor-room" />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{todayStats.totalPatients}</p>
                    <p className="text-sm text-gray-600">Total Patients Today</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{todayStats.completed}</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{todayStats.upcoming}</p>
                    <p className="text-sm text-gray-600">Upcoming</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Video className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{todayStats.ongoing}</p>
                    <p className="text-sm text-gray-600">Ongoing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
              </div>
              <div className="p-6">
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                            <p className="text-sm text-gray-600">{appointment.time}</p>
                            <p className="text-sm text-gray-500">Symptoms: {appointment.symptoms}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'ongoing' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status === 'ongoing' ? 'Ongoing' : 'Scheduled'}
                          </span>
                          {appointment.status === 'ongoing' ? (
                            <button 
                              onClick={() => setActiveTab('video')}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                            >
                              <Video className="w-4 h-4" />
                              <span>Join Call</span>
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                              Start Consultation
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No appointments for today</p>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Activity },
                { id: 'slots', label: 'Manage Slots', icon: Calendar },
                { id: 'queue', label: 'Patient Queue', icon: Users },
                { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};
