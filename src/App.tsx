import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import Preloader from './components/Preloader';
import { RegisterPatient } from './components/auth/RegisterPatient';
import { RegisterDoctor } from './components/auth/RegisterDoctor';
import { Header } from './components/common/Header';
import { PatientProvider } from './contexts/PatientContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import VideoConsultation from './components/VideoConsultation';
import Pharmacy from './components/Pharmacy';
import MedicalProfile from './components/MedicalProfile';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';

type TabType = 'dashboard' | 'appointments' | 'consultation' | 'pharmacy' | 'profile';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showRegister, setShowRegister] = useState<false | 'patient' | 'doctor'>(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowPreloader(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (showPreloader) return <Preloader />;

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!user) return (
    <div>
  {!showRegister && <LoginForm onShowRegister={setShowRegister} />}
  {showRegister === 'patient' && <RegisterPatient onBack={() => setShowRegister(false)} />}
  {showRegister === 'doctor' && <RegisterDoctor onBack={() => setShowRegister(false)} />}
    </div>
  );

  if (user.role === 'doctor') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <DoctorDashboard />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'appointments':
        return <Appointments />;
      case 'consultation':
        return <VideoConsultation />;
      case 'pharmacy':
        return <Pharmacy />;
      case 'profile':
        return <MedicalProfile />;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <PatientProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 lg:ml-64 overflow-auto">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </PatientProvider>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;