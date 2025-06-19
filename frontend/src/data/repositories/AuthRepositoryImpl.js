import { createUser } from '../../domain/entities/User.js';
import { createApiClient } from '../../infrastructure/api/ApiClient.js';
import { setToken, setUser, getUser, clear } from '../../infrastructure/storage/SessionStorage.js';

export const createAuthRepositoryImpl = () => {
  const apiClient = createApiClient();

  const login = async (credentials) => {
    const response = await apiClient.post('/login', {
      login: credentials.login,
      password: credentials.password,
    });

    const user = createUser(
      response.user?.id || null,
      response.user?.firstName || '',
      response.user?.lastName || '',
      response.user?.login || credentials.login,
      response.token
    );

    setToken(response.token);
    setUser(user);

    return user;
  };

  const register = async (credentials) => {
    const response = await apiClient.post('/register', {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      login: credentials.login,
      password: credentials.password,
    });

    const user = createUser(
      response.user?.id || null,
      response.user?.firstName || credentials.firstName,
      response.user?.lastName || credentials.lastName,
      response.user?.login || credentials.login,
      response.token
    );

    setToken(response.token);
    setUser(user);

    return user;
  };

  const logout = async () => {
    clear();
  };

  const getCurrentUser = async () => {
    const userData = getUser();
    if (!userData) return null;

    return createUser(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.login,
      userData.token
    );
  };

  return {
    login,
    register,
    logout,
    getCurrentUser
  };
}; 