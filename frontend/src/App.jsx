import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/index.jsx';
import StudentForm from './components/StudentForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RegisterPage from './pages/register/index.jsx';
import { AuthProvider } from './pages/components/context/AuthContext.jsx';
import DashboardPage from './pages/dashboard/index.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/students/new" 
              element={
                <ProtectedRoute>
                  <StudentForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/students/:id/edit" 
              element={
                <ProtectedRoute>
                  <StudentForm />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
