import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

/**
 * Home Page Component
 * CARE4U Health Platform - Landing page
 * Features showcase and authentication gateway
 */
function Home() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">CARE4U</h1>
          <p className="text-2xl text-indigo-600 font-semibold mb-4">Your Integrated Healthcare Platform</p>
          <p className="text-gray-700 text-lg mb-8">Connect with doctors, check symptoms, track health metrics, and get instant medical guidance all in one place</p>
          
          {!isAuthenticated ? (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/patient-dashboard')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Go to Dashboard
            </button>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">🏥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Video Consultation</h3>
            <p className="text-gray-600">Connect with healthcare professionals via secure video calls from anywhere</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Symptom Checker</h3>
            <p className="text-gray-600">Describe your symptoms and get instant AI-powered health insights and recommendations</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Health Tracking</h3>
            <p className="text-gray-600">Log vitals, track health metrics, and maintain a complete health timeline</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Care Plans</h3>
            <p className="text-gray-600">Get personalized care plans and treatment recommendations from doctors</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 my-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How CARE4U Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Sign Up</h4>
              <p className="text-gray-600 text-sm">Create your account as a patient or doctor</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Check Symptoms</h4>
              <p className="text-gray-600 text-sm">Use AI to analyze symptoms and get insights</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Consult Doctor</h4>
              <p className="text-gray-600 text-sm">Start video consultation with qualified doctors</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Get Care Plan</h4>
              <p className="text-gray-600 text-sm">Receive personalized treatment & follow-ups</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-indigo-600 text-white rounded-lg shadow-lg p-8 my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose CARE4U?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-3">🔒 Secure & Private</h4>
              <p>Your health data is encrypted and protected with industry-leading security standards</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">⚡ Instant Access</h4>
              <p>Connect with doctors anytime, anywhere for immediate medical consultation</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">🎯 AI-Powered</h4>
              <p>Advanced AI analysis helps identify health issues before they become serious</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home