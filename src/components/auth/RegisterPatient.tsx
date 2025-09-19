import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPatient: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ fullName: '', aadhaar: '', phone: '', password: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.phone || form.phone.length < 10) return setError('Please enter a valid phone number');
    if (!form.password || form.password.length < 4) return setError('Password must be at least 4 characters');

    setLoading(true);
    try {
      // Demo: sign the user in after registration
      await login(form.phone, form.password, 'patient');
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
        <h2 className="text-2xl font-bold mb-4">Register as Patient</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Asha Sharma"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhaar</label>
              <input
                type="text"
                value={form.aadhaar}
                onChange={(e) => setForm({ ...form, aadhaar: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="1234 5678 9012"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="9XXXXXXXXX"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Alambagh, Lucknow, Uttar Pradesh"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Choose a password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between">
            <button type="button" onClick={onBack} className="text-sm text-gray-600">Back</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg" disabled={loading}>
              {loading ? 'Registering...' : 'Register & Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
