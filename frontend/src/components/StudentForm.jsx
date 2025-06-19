import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStudentApiClient } from '../core/api/StudentApiClient';
import { Student } from '../domain/entities/Student';
import Popup from './Popup';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [loading, setLoading] = useState(false);
  const studentApi = createStudentApiClient();

  useEffect(() => {
    const fetchStudent = async () => {
      if (id) {
        try {
          setLoading(true);
          const student = await studentApi.getById(id);
          setFormData(student);
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
      }
    };

    fetchStudent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const student = new Student(
        formData.firstName,
        formData.lastName,
        formData.email,
        parseInt(formData.age)
      );

      if (id) {
        await studentApi.update(id, student.toJson());
      } else {
        await studentApi.create(student.toJson());
      }

      setPopupData({
        type: 'success',
        title: 'Success',
        message: `Student successfully ${id ? 'updated' : 'created'}!`
      });
      setShowPopup(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          </div>
          <p className="mt-6 text-purple-200 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {id ? 'Edit Student' : 'Create New Student'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-purple-200">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-purple-200">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-purple-200">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="0"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter age"
                />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  {loading ? 'Saving...' : (id ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
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

export default StudentForm; 