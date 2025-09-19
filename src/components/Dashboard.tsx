import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { Calendar, Video, Pill, Activity, Bell, Clock, User, FileText } from 'lucide-react';
import { usePatientLocale } from '../i18n/patientLocale';
import { getPatientTranslation } from '../i18n/patientTranslations';

type TabType = 'dashboard' | 'appointments' | 'consultation' | 'pharmacy' | 'profile';

interface DashboardProps {
  onTabChange: (tab: TabType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const { patient } = usePatient();
  const { locale, setLocale } = usePatientLocale();

  const t = (key: string) => getPatientTranslation(locale, key as any);

  const localeToTag = (l: string) => {
    switch (l) {
      case 'hi': return 'hi-IN';
      case 'pa': return 'pa-IN';
      case 'bho': return 'hi-IN';
      default: return 'en-US';
    }
  };
  const stats = [
    {
      title: getPatientTranslation(locale, 'stat.nextAppointment'),
      value: 'Tomorrow 2:00 PM',
      subtitle: 'Dr. Amit - Cardiology',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: getPatientTranslation(locale, 'stat.activePrescriptions'),
      value: '3',
      subtitle: getPatientTranslation(locale, 'stat.refillDue'),
      icon: Pill,
      color: 'bg-green-500'
    },
    {
      title: getPatientTranslation(locale, 'stat.lastConsultation'),
      value: '2 days ago',
      subtitle: 'General checkup',
      icon: User,
      color: 'bg-purple-500'
    },
    {
      title: getPatientTranslation(locale, 'stat.labReports'),
      value: '2 New',
      subtitle: 'Blood work & X-ray',
      icon: FileText,
      color: 'bg-orange-500'
    }
  ];

  const vitals = [
    { label: t('vital.bp'), value: '120/80', unit: 'mmHg', status: 'normal' },
    { label: t('vital.hr'), value: '72', unit: 'bpm', status: 'normal' },
    { label: t('vital.bs'), value: '95', unit: 'mg/dL', status: 'normal' },
    { label: t('vital.weight'), value: '68.5', unit: 'kg', status: 'normal' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: getPatientTranslation(locale, 'notification.appointment.title'),
      message: getPatientTranslation(locale, 'notification.appointment.message'),
      time: '1 hour ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'medication',
      title: getPatientTranslation(locale, 'notification.medication.title'),
      message: getPatientTranslation(locale, 'notification.medication.message'),
      time: '30 min ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'report',
      title: getPatientTranslation(locale, 'notification.report.title'),
      message: getPatientTranslation(locale, 'notification.report.message'),
      time: '2 hours ago',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4">
          <img
            src={patient.profilePicture}
            alt={patient.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPatientTranslation(locale, 'welcome')}, {patient.name}!</h1>
            <p className="text-gray-600 mt-1">{getPatientTranslation(locale, 'overview')}</p>
          </div>
        </div>
          <div className="mt-4 lg:mt-0">
            <label className="text-sm text-gray-500 mr-2">{getPatientTranslation(locale, 'label.today')}</label>
            <select className="border rounded px-2 py-1 text-sm" value={locale} onChange={(e) => setLocale(e.target.value as any)}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="bho">भोजपुरी</option>
            </select>
          </div>
        <div className="mt-4 lg:mt-0">
            <div className="text-right">
            <p className="text-sm text-gray-500">{t('label.today')}</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString(localeToTag(locale), { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Health Vitals */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{getPatientTranslation(locale, 'heading.vitals')}</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vitals.map((vital, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{vital.label}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {vital.value} <span className="text-lg font-normal text-gray-500">{vital.unit}</span>
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vital.status === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t('status.' + vital.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{getPatientTranslation(locale, 'heading.notifications')}</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.priority === 'high' ? 'bg-red-500' :
                      notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-xl font-semibold text-gray-900 mb-6">{getPatientTranslation(locale, 'heading.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => onTabChange('appointments')}
            className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Calendar className="w-5 h-5 mr-2" />
            {getPatientTranslation(locale, 'action.bookAppointment')}
          </button>
          <button 
            onClick={() => onTabChange('consultation')}
            className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Video className="w-5 h-5 mr-2" />
            {getPatientTranslation(locale, 'action.joinConsultation')}
          </button>
          <button 
            onClick={() => onTabChange('pharmacy')}
            className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Pill className="w-5 h-5 mr-2" />
            {getPatientTranslation(locale, 'action.orderMedicine')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;