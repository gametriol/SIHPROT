import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const RegisterDoctor: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ fullName: '', regId: '', mobile: '', specialization: '', password: '', clinic: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.regId) return setError('Please provide your registration ID');
    if (!form.password || form.password.length < 4) return setError('Passcode must be at least 4 characters');

    setLoading(true);
    try {
      // Demo: sign-in the doctor after registration
      await login(form.regId, form.password, 'doctor');
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Register as Doctor</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Dr. Rajeev Kumar"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration ID</label>
              <input
                type="text"
                value={form.regId}
                onChange={(e) => setForm({ ...form, regId: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="REG-12345"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="9XXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="General Physician"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Clinic / Hospital</label>
            <input
              type="text"
              value={form.clinic}
              onChange={(e) => setForm({ ...form, clinic: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Lucknow Community Health Centre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Passcode</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Choose a passcode"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between">
            <button type="button" onClick={onBack} className="text-sm text-gray-600">Back</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg" disabled={loading}>
              {loading ? 'Registering...' : 'Register & Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
