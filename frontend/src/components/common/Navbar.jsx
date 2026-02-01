import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              CARE4U
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition duration-300">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === 'patient' && (
                  <Link to="/patient-dashboard" className="text-gray-700 hover:text-indigo-600 transition duration-300">
                    Dashboard
                  </Link>
                )}
                {user?.role === 'doctor' && (
                  <Link to="/doctor-dashboard" className="text-gray-700 hover:text-indigo-600 transition duration-300">
                    Dashboard
                  </Link>
                )}
                <span className="text-gray-600">
                  Welcome, {user?.full_name || user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition duration-300">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;