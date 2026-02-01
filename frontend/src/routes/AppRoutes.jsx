import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PatientDashboardFull from '../pages/PatientDashboardFull';
import DoctorDashboardFull from '../pages/DoctorDashboardFull';
import VideoConsultation from '../pages/VideoConsultation';
import PatientPortal from '../pages/PatientPortal';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/patient-dashboard" element={<PatientDashboardFull />} />
      <Route path="/patient-portal" element={<PatientPortal />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboardFull />} />
      <Route path="/video-consultation/:roomId" element={<VideoConsultation />} />
    </Routes>
  );
};

export default AppRoutes;