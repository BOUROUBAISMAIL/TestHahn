import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRightOnRectangleIcon, 
  UserCircleIcon, 
  SparklesIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { createStudentApiClient } from '../../core/api/StudentApiClient.js';
import Popup from '../../components/Popup.jsx';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [studentToDelete, setStudentToDelete] = useState(null);
  const studentApi = createStudentApiClient();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentApi.getAll();
      setStudents(data);
    } catch (error) {
      setPopupData({
        type: 'error',
        title: 'Error',
        message: error.message
      });
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setPopupData({
      type: 'confirmation',
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this student?',
    });
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (studentToDelete) {
      try {
        await studentApi.remove(studentToDelete);
        setPopupData({
          type: 'success',
          title: 'Success',
          message: 'Student deleted successfully!',
        });
        setShowPopup(true);
        fetchStudents();
      } catch (error) {
        setPopupData({
          type: 'error',
          title: 'Error',
          message: error.message,
        });
        setShowPopup(true);
      } finally {
        setStudentToDelete(null);
      }
    }
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
                  <h1 className="text-2xl font-bold text-white">Student Management</h1>
                  <p className="text-purple-200 text-sm">Manage your students</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
               

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
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Students</h2>
                <button
                  onClick={() => navigate('/students/new')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-100 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Student</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                  </div>
                  <p className="mt-6 text-purple-200 text-lg font-medium">Loading students...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-purple-200 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-white/5 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-white">{student.firstName} {student.lastName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-purple-200">{student.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-purple-200">{student.age}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => navigate(`/students/${student.id}/edit`)}
                                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-200"
                              >
                                <PencilSquareIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(student.id)}
                                className="p-2 bg-red-500/10 backdrop-blur-sm rounded-lg border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-6 py-12 text-center text-purple-200">
                            No students found. Click the "Add Student" button to create one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          if (popupData.type === 'confirmation') {
            setStudentToDelete(null);
          }
        }}
        type={popupData.type}
        title={popupData.title}
        message={popupData.message}
        onConfirm={popupData.type === 'confirmation' ? handleConfirmDelete : null}
      />
    </div>
  );
};

export default DashboardPage; 