import { useState, useEffect } from 'react';
import { createLoginUseCase } from '../../domain/handleAuth/LoginUseCase.js';
import { createRegisterUseCase } from '../../domain/handleAuth/RegisterUseCase.js';
import { createAuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl.js';
import { getUser, isAuthenticated } from '../../core/storage/SessionStorage.js';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authRepository = createAuthRepositoryImpl();
  const loginUseCase = createLoginUseCase(authRepository);
  const registerUseCase = createRegisterUseCase(authRepository);

  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = getUser();
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (login, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await loginUseCase.execute(login, password);
      
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName, lastName, login, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await registerUseCase.execute(firstName, lastName, login, password);
      
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authRepository.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const isUserAuthenticated = () => {
    return !!user && isAuthenticated();
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: isUserAuthenticated,
  };
}; 