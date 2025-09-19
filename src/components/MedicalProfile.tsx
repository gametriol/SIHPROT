import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { User, Phone, Mail, MapPin, Droplets, AlertTriangle, Heart, FileText, Shield, Contact } from 'lucide-react';

const MedicalProfile: React.FC = () => {
  const { patient } = usePatient();

  const medicalDocuments = [
    {
      id: '1',
      name: 'Blood Test Results',
      date: '2024-03-10',
      type: 'Lab Report',
      doctor: 'Dr. Anjali Sharma'
    },
    {
      id: '2',
      name: 'Chest X-Ray',
      date: '2024-02-28',
      type: 'Imaging',
      doctor: 'Dr. Rajeev Kumar'
    },
    {
      id: '3',
      name: 'ECG Report',
      date: '2024-02-15',
      type: 'Cardiac Test',
      doctor: 'Dr. Anjali Sharma'
    },
    {
      id: '4',
      name: 'Annual Physical Exam',
      date: '2024-01-20',
      type: 'General Report',
      doctor: 'Dr. Priya Singh'
    }
  ];

  const vaccinations = [
    {
      vaccine: 'COVID-19 Booster',
      date: '2024-01-15',
      nextDue: '2024-07-15'
    },
    {
      vaccine: 'Influenza',
      date: '2023-10-01',
      nextDue: '2024-10-01'
    },
    {
      vaccine: 'Tetanus',
      date: '2022-03-12',
      nextDue: '2032-03-12'
    }
  ];

  const insuranceInfo = {
    provider: 'Uttar Pradesh HealthCare Ltd. (Lucknow)',
    policyNumber: 'UPHC-2024-789456',
    groupNumber: 'UP-GRP-001234',
    effectiveDate: '2024-01-01',
    expiryDate: '2024-12-31'
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Medical Profile — Uttar Pradesh</h1>
        <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
          केवल देखना
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Personal Information (व्यक्तिगत जानकारी)</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <img
              src={patient.profilePicture}
              alt={patient.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-gray-600">{patient.age} years old • {patient.gender}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-gray-900">{patient.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-gray-900">{patient.phone}</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1" />
              <span className="text-gray-900">{patient.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Medical Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Heart className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Medical Information</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <Droplets className="w-4 h-4 text-red-500 mr-3" />
                <span className="text-gray-600">Blood Group (रक्त समूह)</span>
              </div>
              <span className="font-semibold text-gray-900">{patient.bloodGroup}</span>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-3" />
                <span className="text-gray-600">Allergies (एलर्जी)</span>
              </div>
              <div className="ml-7 flex flex-wrap gap-2">
                {patient.allergies.map((allergy, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Heart className="w-4 h-4 text-blue-500 mr-3" />
                <span className="text-gray-600">Chronic Conditions (पुरानी बीमारियाँ)</span>
              </div>
              <div className="ml-7 flex flex-wrap gap-2">
                {patient.chronicConditions.map((condition, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Contact className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Emergency Contact (आपातकालीन संपर्क)</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="text-lg font-semibold text-gray-900">{patient.emergencyContact.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Relationship</p>
              <p className="text-gray-900">{patient.emergencyContact.relation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
              <p className="text-gray-900">{patient.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Documents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Medical Documents (डॉक्यूमेंट्स)</h2>
          </div>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            View All
          </button>
        </div>
        
        <div className="grid gap-4">
          {medicalDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.type} • {doc.doctor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{doc.date}</p>
                <button className="text-sm text-blue-600 hover:text-blue-700">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vaccination Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Vaccination Records</h2>
          </div>
          
          <div className="space-y-4">
            {vaccinations.map((vaccination, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{vaccination.vaccine}</p>
                  <p className="text-sm text-gray-500">Administered: {vaccination.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Next due:</p>
                  <p className="text-sm font-medium text-gray-900">{vaccination.nextDue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Insurance Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Insurance Provider</p>
              <p className="font-semibold text-gray-900">{insuranceInfo.provider}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Policy Number</p>
              <p className="text-gray-900 font-mono">{insuranceInfo.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Group Number</p>
              <p className="text-gray-900 font-mono">{insuranceInfo.groupNumber}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Effective Date</p>
                <p className="text-gray-900">{insuranceInfo.effectiveDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="text-gray-900">{insuranceInfo.expiryDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfile;