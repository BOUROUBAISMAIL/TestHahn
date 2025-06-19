import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRightOnRectangleIcon, 
  UserCircleIcon, 
  SparklesIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  HeartIcon,
  StarIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          </div>
          <p className="mt-6 text-purple-200 text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg">
                    <SparklesIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <p className="text-purple-200 text-sm">Welcome to your control center</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-200 group">
                  <BellIcon className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>

                {/* Settings */}
                <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-200">
                  <CogIcon className="h-6 w-6" />
                </button>

                {/* User menu */}
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-50"></div>
                    <UserCircleIcon className="h-8 w-8 text-white relative z-10" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">{user.fullName}</p>
                    <p className="text-purple-200 text-xs">{user.login}</p>
                  </div>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="relative group p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Welcome Card */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Welcome back, {user.firstName}! 👋
                      </h2>
                      <p className="text-purple-200">
                        Here's what's happening with your account today
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4">
                        <HeartIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <ChartBarIcon className="h-8 w-8 text-purple-400" />
                        <span className="text-2xl font-bold text-white">98%</span>
                      </div>
                      <p className="text-purple-200 text-sm">Account Health</p>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <StarIcon className="h-8 w-8 text-yellow-400" />
                        <span className="text-2xl font-bold text-white">4.9</span>
                      </div>
                      <p className="text-purple-200 text-sm">User Rating</p>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <BoltIcon className="h-8 w-8 text-blue-400" />
                        <span className="text-2xl font-bold text-white">24</span>
                      </div>
                      <p className="text-purple-200 text-sm">Active Sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl border border-emerald-500/30 text-emerald-200 hover:text-white hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-200 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">View Profile</span>
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      </div>
                    </button>
                    
                    <button className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 text-blue-200 hover:text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Settings</span>
                        <CogIcon className="h-5 w-5" />
                      </div>
                    </button>
                    
                    <button className="w-full p-4 bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-sm rounded-2xl border border-pink-500/30 text-pink-200 hover:text-white hover:from-pink-500/30 hover:to-rose-500/30 transition-all duration-200 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Help & Support</span>
                        <SparklesIcon className="h-5 w-5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Your Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Member Since</span>
                      <span className="text-white font-medium">Today</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Last Login</span>
                      <span className="text-white font-medium">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage; 