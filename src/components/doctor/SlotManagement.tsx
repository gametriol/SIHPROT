import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash2 } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  patientName?: string;
}

export const SlotManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState('');

  const [slots, setSlots] = useState<TimeSlot[]>([
    { id: '1', date: format(new Date(), 'yyyy-MM-dd'), time: '09:00 AM', available: true },
    { id: '2', date: format(new Date(), 'yyyy-MM-dd'), time: '09:30 AM', available: false, patientName: 'Patient #1234' },
    { id: '3', date: format(new Date(), 'yyyy-MM-dd'), time: '02:00 PM', available: true },
    { id: '4', date: format(new Date(), 'yyyy-MM-dd'), time: '02:30 PM', available: true },
  ]);

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
  const daySlots = slots.filter(slot => slot.date === selectedDateString);

  const handleAddSlot = () => {
    if (newSlotTime) {
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        date: selectedDateString,
        time: newSlotTime,
        available: true,
      };
      setSlots(prev => [...prev, newSlot]);
      setNewSlotTime('');
      setShowAddSlot(false);
    }
  };

  const handleDeleteSlot = (slotId: string) => {
    setSlots(prev => prev.filter(slot => slot.id !== slotId));
  };

  const handleToggleAvailability = (slotId: string) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId 
        ? { ...slot, available: !slot.available, ...(slot.available ? {} : { patientName: undefined }) }
        : slot
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Time Slots</h2>
          <p className="text-gray-600">Set your availability for patient consultations</p>
        </div>
        <button
          onClick={() => setShowAddSlot(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slot</span>
        </button>
      </div>

      {/* Date Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Select Date</h3>
        <div className="grid grid-cols-7 gap-2">
          {next7Days.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`p-3 rounded-lg border text-center transition-all ${
                isSameDay(date, selectedDate)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xs text-gray-500">
                {format(date, 'EEE')}
              </div>
              <div className="font-medium">
                {format(date, 'd')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Slots for Selected Date */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">
            Slots for {format(selectedDate, 'PPPP')}
          </h3>
        </div>
        <div className="p-6">
          {daySlots.length > 0 ? (
            <div className="space-y-4">
              {daySlots.map((slot) => (
                <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{slot.time}</p>
                      {slot.patientName && (
                        <p className="text-sm text-gray-600">Booked by: {slot.patientName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      slot.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </span>
                    
                    <button
                      onClick={() => handleToggleAvailability(slot.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {slot.available ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No slots for this date</h3>
              <p className="text-gray-600">Add time slots to allow patient bookings.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Time Slot</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <select
                value={newSlotTime}
                onChange={(e) => setNewSlotTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="09:30 AM">09:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddSlot(false);
                  setNewSlotTime('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSlot}
                disabled={!newSlotTime}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
