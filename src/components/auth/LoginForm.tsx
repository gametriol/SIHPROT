import React, { useState } from "react";
import { Phone, CreditCard, UserCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const LoginForm: React.FC<{
  onShowRegister?: (v: false | "patient" | "doctor") => void;
}> = ({ onShowRegister }) => {
  const { login } = useAuth();
    const [formData, setFormData] = useState({
      phone: '',
      password: '',
      regId: '',
      passcode: '',
      role: 'patient' as 'patient' | 'doctor',
    });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.role === 'patient') {
        await login(formData.phone, formData.password, 'patient');
      } else {
        // doctor uses registration id as identifier
        await login(formData.regId, formData.passcode, 'doctor');
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4">
             <img
               src="/logo-removebg-preview.svg"
               alt="Medi-Mantra Logo"
               className="w-25 h-25 object-contain"
             />
           </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Medi-Mantra
          </h2>
          <p className="text-gray-600">Your Rural Healthcare Companion</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "patient" }))
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.role === "patient"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <UserCheck className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Patient</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "doctor" }))
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.role === "doctor"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Doctor</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.role === 'patient' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration ID *</label>
                <input
                  type="text"
                  required
                  value={formData.regId}
                  onChange={(e) => setFormData(prev => ({ ...prev, regId: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your registration ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passcode</label>
                <input
                  type="password"
                  required
                  value={formData.passcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, passcode: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your passcode"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              formData.role === 'patient'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          {/* <p className="text-xs text-gray-500">
            Secure & Private • NDHM Compliant
          </p> */}
          <div className="mt-4 text-sm">
            <span className="text-gray-600">Don't have an account?</span>
            <button
              onClick={() => onShowRegister?.("patient")}
              className="ml-2 text-blue-600"
            >
              Register as Patient
            </button>
            <button
              onClick={() => onShowRegister?.("doctor")}
              className="ml-4 text-green-600"
            >
              Register as Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
