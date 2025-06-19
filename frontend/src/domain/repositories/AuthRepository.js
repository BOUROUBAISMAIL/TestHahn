import { User } from '../entities/User.js';
import { AuthCredentials, RegisterCredentials } from '../entities/AuthCredentials.js';

// AuthRepository interface as function-based module
export const createAuthRepository = () => {
  const login = async (credentials) => {
    throw new Error('login method must be implemented');
  };

  const register = async (credentials) => {
    throw new Error('register method must be implemented');
  };

  const logout = async () => {
    throw new Error('logout method must be implemented');
  };

  const getCurrentUser = async () => {
    throw new Error('getCurrentUser method must be implemented');
  };

  return {
    login,
    register,
    logout,
    getCurrentUser
  };
}; 