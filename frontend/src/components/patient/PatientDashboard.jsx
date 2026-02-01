import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    symptoms: '',
    doctor_id: ''
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const [appointmentsRes, doctorsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/patient/appointments`, config),
        axios.get(`${API_BASE_URL}/patient/doctors`, config)
      ]);

      setAppointments(appointmentsRes.data || []);
      setDoctors(doctorsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/patient/appointments`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setShowBookingModal(false);
      setBookingData({ date: '', time: '', symptoms: '', doctor_id: '' });
      
      // Refresh appointments list
      await fetchData();
      
      // Show success message with appointment details
      const appointment = response.data.appointment || response.data;
      alert(`✅ Appointment Booked Successfully!\n\nDoctor: ${appointment.doctor_name}\nDate: ${appointment.date}\nTime: ${appointment.time}\nStatus: ${appointment.status}\n\nYour appointment has been confirmed!`);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('❌ Failed to book appointment. Please try again.');
    }
  };

  const handleStartVideoConsultation = (roomId) => {
    navigate(`/video-consultation/${roomId || 'room-' + Date.now()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="mt-2 text-gray-600">Welcome back, {user?.name || user?.username}!</p>
            </div>
            <button
              onClick={() => setShowBookingModal(true)}
              className="whitespace-nowrap px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <button
            onClick={() => handleStartVideoConsultation()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4 text-left">
                <p className="text-lg font-semibold">Video Consultation</p>
                <p className="text-sm opacity-90">Start now</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/patient-portal')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4 text-left">
                <p className="text-lg font-semibold">AI Symptom Checker</p>
                <p className="text-sm opacity-90">Check symptoms</p>
              </div>
            </div>
          </button>

          <button
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4 text-left">
                <p className="text-lg font-semibold">Health Analytics</p>
                <p className="text-sm opacity-90">View reports</p>
              </div>
            </div>
          </button>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Appointments</h2>
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-gray-500">No appointments yet</p>
              <button
                onClick={() => setShowBookingModal(true)}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Dr. {appointment.doctor_name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Date:</span> {appointment.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Time:</span> {appointment.time}
                      </p>
                      {appointment.symptoms && (
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Doctor
                </label>
                <select
                  required
                  value={bookingData.doctor_id}
                  onChange={(e) => setBookingData({ ...bookingData, doctor_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.name} - {doctor.specialization || 'General'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  required
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symptoms (Optional)
                </label>
                <textarea
                  value={bookingData.symptoms}
                  onChange={(e) => setBookingData({ ...bookingData, symptoms: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe your symptoms..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;