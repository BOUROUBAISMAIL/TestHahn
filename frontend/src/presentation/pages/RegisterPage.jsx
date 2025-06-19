import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, SparklesIcon, ArrowRightIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth.js';
import Popup from '../components/Popup.jsx';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    login: false,
    password: false,
    confirmPassword: false
  });

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.login || !formData.password || !formData.confirmPassword) {
      return 'Please fill in all fields.';
    }

    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setPopupData({
        type: 'error',
        title: 'Validation Error',
        message: validationError
      });
      setShowPopup(true);
      return;
    }

    const result = await register(
      formData.firstName,
      formData.lastName,
      formData.login,
      formData.password
    );
    
    if (result.success) {
      setPopupData({
        type: 'success',
        title: 'Registration Successful',
        message: 'Account created successfully! Redirecting to dashboard...'
      });
      setShowPopup(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setPopupData({
        type: 'error',
        title: 'Registration Failed',
        message: result.error || 'An error occurred during registration.'
      });
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          {/* Glassmorphism card */}
          <div className="relative group">
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-4 shadow-lg">
                    <UserPlusIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Join Us Today
                </h2>
                <p className="text-emerald-200">
                  Create your account and start your journey
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isFocused.firstName ? 'opacity-100' : ''}`}></div>
                    <div className="relative">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused({ ...isFocused, firstName: true })}
                        onBlur={() => setIsFocused({ ...isFocused, firstName: false })}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isFocused.lastName ? 'opacity-100' : ''}`}></div>
                    <div className="relative">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused({ ...isFocused, lastName: true })}
                        onBlur={() => setIsFocused({ ...isFocused, lastName: false })}
                      />
                    </div>
                  </div>
                </div>

                {/* Login field */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isFocused.login ? 'opacity-100' : ''}`}></div>
                  <div className="relative">
                    <input
                      id="login"
                      name="login"
                      type="text"
                      required
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      placeholder="Choose your login"
                      value={formData.login}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused({ ...isFocused, login: true })}
                      onBlur={() => setIsFocused({ ...isFocused, login: false })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Password field */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isFocused.password ? 'opacity-100' : ''}`}></div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 pr-12"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused({ ...isFocused, password: true })}
                      onBlur={() => setIsFocused({ ...isFocused, password: false })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-200 hover:text-white transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isFocused.confirmPassword ? 'opacity-100' : ''}`}></div>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 pr-12"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused({ ...isFocused, confirmPassword: true })}
                      onBlur={() => setIsFocused({ ...isFocused, confirmPassword: false })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-200 hover:text-white transition-colors duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
                  <div className="relative flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Login link */}
              <div className="mt-8 text-center">
                <p className="text-emerald-200">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-semibold text-white hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-400 underline-offset-4 hover:decoration-emerald-300"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type={popupData.type}
        title={popupData.title}
        message={popupData.message}
      />
    </div>
  );
};

export default RegisterPage; 