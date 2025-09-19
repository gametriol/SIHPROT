import React, { useState } from 'react';
import { Users, Clock, Video, FileText, MessageSquare } from 'lucide-react';
import { Appointment } from '../../types';

export const PatientQueue: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);

  const appointments: Appointment[] = [
    {
      id: '1',
      patientId: 'p1',
      doctorId: 'd1',
      patientName: 'Patient #1234',
      doctorName: 'Dr. Current User',
      specialization: 'General Medicine',
      date: '2024-12-10',
      time: '2:00 PM',
      status: 'ongoing',
      symptoms: 'Fever (101°F) for 3 days, mild cough, headache, body aches. No shortness of breath.',
      roomId: 'room-abc123',
    },
    {
      id: '2',
      patientId: 'p2',
      doctorId: 'd1',
      patientName: 'Patient #5678',
      doctorName: 'Dr. Current User',
      specialization: 'General Medicine',
      date: '2024-12-10',
      time: '2:30 PM',
      status: 'scheduled',
      symptoms: 'Joint pain in both knees for 1 week, difficulty walking, swelling noticed yesterday.',
    },
    {
      id: '3',
      patientId: 'p3',
      doctorId: 'd1',
      patientName: 'Patient #9012',
      doctorName: 'Dr. Current User',
      specialization: 'General Medicine',
      date: '2024-12-10',
      time: '3:00 PM',
      status: 'scheduled',
      symptoms: 'Persistent headache for 2 days, sensitivity to light, nausea.',
    },
    {
      id: '4',
      patientId: 'p4',
      doctorId: 'd1',
      patientName: 'Patient #3456',
      doctorName: 'Dr. Current User',
      specialization: 'General Medicine',
      date: '2024-12-10',
      time: '1:30 PM',
      status: 'completed',
      symptoms: 'Stomach pain and indigestion after meals.',
      prescription: 'Antacid tablets, dietary modifications advised.',
      notes: 'Patient responded well to treatment. Follow up if symptoms persist.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ongoingAppointments = appointments.filter(apt => apt.status === 'ongoing');
  const scheduledAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  if (selectedPatient) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            onClick={() => setSelectedPatient(null)}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Queue
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Patient Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedPatient.patientName}</h2>
                <p className="text-gray-600">{selectedPatient.date} at {selectedPatient.time}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(selectedPatient.status)}`}>
                  {selectedPatient.status.charAt(0).toUpperCase() + selectedPatient.status.slice(1)}
                </span>
              </div>
              <div className="flex space-x-3">
                {selectedPatient.status === 'ongoing' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Video className="w-4 h-4" />
                    <span>Join Video Call</span>
                  </button>
                )}
                {selectedPatient.status === 'scheduled' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Video className="w-4 h-4" />
                    <span>Start Consultation</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="p-6 space-y-6">
            {/* Symptoms */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Reported Symptoms</span>
              </h4>
              <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                {selectedPatient.symptoms}
              </p>
            </div>

            {/* Prescription (if completed) */}
            {selectedPatient.prescription && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Prescription</span>
                </h4>
                <p className="text-gray-700 bg-green-50 p-4 rounded-lg border border-green-200">
                  {selectedPatient.prescription}
                </p>
              </div>
            )}

            {/* Doctor's Notes (if completed) */}
            {selectedPatient.notes && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
                <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  {selectedPatient.notes}
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FileText className="w-4 h-4" />
                <span>Write Prescription</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Add Notes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Patient Queue</h2>
        <p className="text-gray-600">Manage your patient consultations</p>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Video className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{ongoingAppointments.length}</p>
              <p className="text-sm text-gray-600">Ongoing Consultations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{scheduledAppointments.length}</p>
              <p className="text-sm text-gray-600">Scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{completedAppointments.length}</p>
              <p className="text-sm text-gray-600">Completed Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ongoing Consultations */}
      {ongoingAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Ongoing Consultations</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {ongoingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">{appointment.symptoms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Ongoing
                    </span>
                    <button
                      onClick={() => setSelectedPatient(appointment)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Scheduled Appointments</h3>
        </div>
        <div className="p-6">
          {scheduledAppointments.length > 0 ? (
            <div className="space-y-4">
              {scheduledAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">{appointment.symptoms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Scheduled
                    </span>
                    <button
                      onClick={() => setSelectedPatient(appointment)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No scheduled appointments</p>
          )}
        </div>
      </div>

      {/* Completed Consultations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Completed Today</h3>
        </div>
        <div className="p-6">
          {completedAppointments.length > 0 ? (
            <div className="space-y-4">
              {completedAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">{appointment.symptoms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                    <button
                      onClick={() => setSelectedPatient(appointment)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No completed consultations today</p>
          )}
        </div>
      </div>
    </div>
  );
};
