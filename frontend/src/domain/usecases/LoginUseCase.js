import { createAuthCredentials } from '../entities/AuthCredentials.js';

export const createLoginUseCase = (authRepository) => {
  const execute = async (login, password) => {
    try {
      const credentials = createAuthCredentials(login, password);
      const user = await authRepository.login(credentials);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { execute };
}; 