import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Upload, Search, Filter, ArrowLeft } from 'lucide-react';
import { usePatientLocale } from '../i18n/patientLocale';
import { getPatientTranslation } from '../i18n/patientTranslations';

interface Doctor {
  id: string;
  name: string;
  hospital: string;
  specialty: string;
  experience: number;
  rating: number;
  age: number;
  avatar: string;
  nextAvailable: string;
  consultationFee: number;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'in-person' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled';
}

const specialties = [
  'General Physician',
  'Cardiologist', 
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Neurologist',
  'Gynecologist',
  'Psychiatrist',
  'Ophthalmologist',
  'ENT Specialist'
];

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Virendra Rastogi',
    hospital: 'City General Hospital',
    specialty: 'Cardiologist',
    experience: 8,
    rating: 4.8,
    age: 42,
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    nextAvailable: 'Today 3:00 PM',
    consultationFee: 150
  },
  {
    id: '2',
    name: 'Dr. Keeran K.',
    hospital: 'Metro Medical Center',
    specialty: 'Cardiologist',
    experience: 12,
    rating: 4.9,
    age: 45,
    avatar: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    nextAvailable: 'Tomorrow 10:00 AM',
    consultationFee: 200
  },
  {
    id: '3',
    name: 'Dr. Arvind Shukla',
    hospital: 'Healthcare Plus',
    specialty: 'General Physician',
    experience: 6,
    rating: 4.7,
    age: 38,
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    nextAvailable: 'Today 5:00 PM',
    consultationFee: 100
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Mahesh Patel',
    specialty: 'Cardiologist',
    date: '2024-03-15',
    time: '2:00 PM',
    type: 'in-person',
    status: 'upcoming'
  },
  {
    id: '2',
    doctorName: 'Dr. Ajay Verma',
    specialty: 'Cardiologist', 
    date: '2024-03-10',
    time: '10:30 AM',
    type: 'video',
    status: 'completed'
  }
];

const Appointments: React.FC = () => {
  const { locale } = usePatientLocale();
  const [view, setView] = useState<'list' | 'book' | 'doctor-select' | 'book-form'>('list');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    const doctors = mockDoctors.filter(doc => doc.specialty === specialty);
    setFilteredDoctors(doctors);
    setView('doctor-select');
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setView('book-form');
  };

  const renderAppointmentsList = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
  <h1 className="text-3xl font-bold text-gray-900">{getPatientTranslation(locale, 'Appointments') || 'Appointments'}</h1>
        <button 
          onClick={() => setView('book')}
          className="mt-4 sm:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          {getPatientTranslation(locale, 'Book New Appointment') || 'Book New Appointment'}
        </button>
      </div>

      <div className="grid gap-6">
        {mockAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  appointment.status === 'upcoming' ? 'bg-green-100' :
                  appointment.status === 'completed' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Calendar className={`w-6 h-6 ${
                    appointment.status === 'upcoming' ? 'text-green-600' :
                    appointment.status === 'completed' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{appointment.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm capitalize">{appointment.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpecialtySelection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setView('list')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
  <h1 className="text-3xl font-bold text-gray-900">{getPatientTranslation(locale, 'Book Appointment') || 'Book Appointment'}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-xl font-semibold text-gray-900 mb-6">{getPatientTranslation(locale, 'Select Specialty') || 'Select Specialty'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => handleSpecialtySelect(specialty)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-left"
            >
              <h3 className="font-medium text-gray-900">{specialty}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDoctorSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setView('book')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Select Doctor</h1>
        <span className="text-lg text-gray-600">- {selectedSpecialty}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Doctors</h2>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={doctor.avatar} 
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.hospital}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{doctor.experience} years exp.</span>
                      <span className="text-sm text-gray-600">Age {doctor.age}</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Available: {doctor.nextAvailable}</p>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 text-right">
                  <p className="text-lg font-semibold text-gray-900">₹{doctor.consultationFee}</p>
                  <p className="text-sm text-gray-500 mb-3">Consultation Fee</p>
                  <button
                    onClick={() => handleDoctorSelect(doctor)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBookingForm = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setView('doctor-select')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {selectedDoctor && (
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img 
              src={selectedDoctor.avatar} 
              alt={selectedDoctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
              <p className="text-gray-600">{selectedDoctor.specialty} • {selectedDoctor.hospital}</p>
            </div>
          </div>
        )}

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
              <input
                type="text"
                value="Sarah Johnson"
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>In-person</option>
                <option>Video Consultation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>2:00 PM</option>
                <option>3:00 PM</option>
                <option>4:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit / Symptoms</label>
            <textarea
              rows={4}
              placeholder="Please describe your symptoms or reason for visit..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Medical History</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors duration-200">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload files</span>
                    <input type="file" className="sr-only" multiple />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, PNG, JPG up to 10MB each</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setView('doctor-select')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  switch (view) {
    case 'book':
      return renderSpecialtySelection();
    case 'doctor-select':
      return renderDoctorSelection();
    case 'book-form':
      return renderBookingForm();
    default:
      return renderAppointmentsList();
  }
};

export default Appointments;