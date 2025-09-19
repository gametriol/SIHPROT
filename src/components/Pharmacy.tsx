import React, { useState } from 'react';
import { Pill, Clock, Package, Truck, CheckCircle, AlertCircle, Plus, Search } from 'lucide-react';
import { usePatientLocale } from '../i18n/patientLocale';
import { getPatientTranslation } from '../i18n/patientTranslations';

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  prescribedDate: string;
  status: 'active' | 'completed' | 'refill-needed';
  refillsRemaining: number;
  nextDue: string;
}

interface Order {
  id: string;
  orderDate: string;
  medications: string[];
  status: 'ordered' | 'dispatched' | 'delivered';
  trackingId: string;
  estimatedDelivery: string;
  total: number;
}

const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    medicationName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: '30 days',
    prescribedBy: 'Dr. Sarah Wilson',
    prescribedDate: '2024-03-01',
    status: 'active',
    refillsRemaining: 2,
    nextDue: '2024-03-31'
  },
  {
    id: '2',
    medicationName: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '30 days',
    prescribedBy: 'Dr. Michael Chen',
    prescribedDate: '2024-02-15',
    status: 'refill-needed',
    refillsRemaining: 0,
    nextDue: '2024-03-17'
  },
  {
    id: '3',
    medicationName: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'Once daily',
    duration: '90 days',
    prescribedBy: 'Dr. Emily Rodriguez',
    prescribedDate: '2024-01-20',
    status: 'active',
    refillsRemaining: 1,
    nextDue: '2024-04-20'
  }
];

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    orderDate: '2024-03-12',
    medications: ['Lisinopril 10mg', 'Multivitamin'],
    status: 'dispatched',
    trackingId: 'TRK123456',
    estimatedDelivery: '2024-03-15',
    total: 45.99
  },
  {
    id: 'ORD-002',
    orderDate: '2024-03-05',
    medications: ['Metformin 500mg'],
    status: 'delivered',
    trackingId: 'TRK123455',
    estimatedDelivery: '2024-03-08',
    total: 25.50
  }
];

const Pharmacy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'orders' | 'catalog'>('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');

  const { locale } = usePatientLocale();

  const t = (key: string) => getPatientTranslation(locale, key as any);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'refill-needed':
        return 'bg-red-100 text-red-800';
      case 'ordered':
        return 'bg-blue-100 text-blue-800';
      case 'dispatched':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'refill-needed':
        return <AlertCircle className="w-4 h-4" />;
      case 'ordered':
        return <Clock className="w-4 h-4" />;
      case 'dispatched':
        return <Truck className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const renderPrescriptions = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
  <h2 className="text-2xl font-semibold text-gray-900">{t('pharmacy.tab.prescriptions')}</h2>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('pharmacy.search.placeholder')}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {mockPrescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {prescription.medicationName} {prescription.dosage}
                  </h3>
                  <p className="text-gray-600">{prescription.frequency} • {prescription.duration}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Prescribed by {prescription.prescribedBy} on {prescription.prescribedDate}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm text-gray-500">
                      Refills remaining: {prescription.refillsRemaining}
                    </span>
                    <span className="text-sm text-gray-500">
                      Next due: {prescription.nextDue}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex flex-col items-end space-y-2">
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.status)}`}>
                  {getStatusIcon(prescription.status)}
                  <span className="ml-2 capitalize">{prescription.status.replace('-', ' ')}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    {t('pharmacy.details')}
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    {t('pharmacy.reorder')}
                  </button>
                </div>
              </div>
            </div>
            
            {prescription.status === 'refill-needed' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-sm text-red-800 font-medium">
                    {t('pharmacy.refillNeeded')}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
  <h2 className="text-2xl font-semibold text-gray-900">{t('pharmacy.tab.orders')}</h2>
      
      <div className="grid gap-6">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('pharmacy.order.id')} {order.id}</h3>
                  <p className="text-gray-600">
                    {order.medications.join(', ')}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm text-gray-500">
                      Ordered: {order.orderDate}
                    </span>
                    <span className="text-sm text-gray-500">
                      Tracking: {order.trackingId}
                    </span>
                  </div>
                  {order.status !== 'delivered' && (
                    <p className="text-sm text-gray-500 mt-1">
                      Estimated delivery: {order.estimatedDelivery}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex flex-col items-end space-y-2">
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-2 capitalize">{order.status}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    {t('pharmacy.trackOrder')}
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    {t('pharmacy.reorder')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCatalog = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
  <h2 className="text-2xl font-semibold text-gray-900">{t('pharmacy.tab.catalog')}</h2>
        <div className="mt-4 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('pharmacy.search.placeholder')}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('pharmacy.browseCatalog')}</h3>
        <p className="text-gray-600 mb-6">
          {t('pharmacy.browseCatalog')}
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          {t('pharmacy.browseCatalog')}
        </button>
      </div>
    </div>
  );

  const renderMedicineReminders = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('pharmacy.medicineReminders')}</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Lisinopril 10mg</p>
              <p className="text-sm text-gray-600">{t('pharmacy.dueIn').replace('{time}', '2 hours')}</p>
            </div>
          </div>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Mark Taken
          </button>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-900">Metformin 500mg</p>
              <p className="text-sm text-gray-600">{t('pharmacy.overdueBy').replace('{time}', '1 hour')}</p>
            </div>
          </div>
          <button className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200">
            Mark Taken
          </button>
        </div>
      </div>
      
      <button className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        {t('pharmacy.setNewReminder')}
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pharmacy</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'prescriptions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors duration-200`}
          >
            Prescriptions
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors duration-200`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'catalog'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors duration-200`}
          >
            Medicine Catalog
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'prescriptions' && renderPrescriptions()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'catalog' && renderCatalog()}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {renderMedicineReminders()}
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;