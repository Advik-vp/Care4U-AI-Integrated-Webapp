import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import AppRoutes from './routes/AppRoutes'
import './App.css'

/**
 * Main App Component
 * CARE4U Health Platform - Integrated Healthcare Solution
 * Features: Patient Portal, Doctor Portal, Video Consultation, AI Symptom Checker
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="App">
            <Navbar />
            <AppRoutes />
            <Footer />
          </div>
        </UserProvider>
      </AuthProvider>
    </Router>
  )
}

export default App