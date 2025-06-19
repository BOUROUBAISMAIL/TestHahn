import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './presentation/context/AuthContext.jsx';
import LoginPage from './presentation/pages/LoginPage.jsx';
import RegisterPage from './presentation/pages/RegisterPage.jsx';
import DashboardPage from './presentation/pages/DashboardPage.jsx';
import ProtectedRoute from './presentation/components/ProtectedRoute.jsx';

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
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
