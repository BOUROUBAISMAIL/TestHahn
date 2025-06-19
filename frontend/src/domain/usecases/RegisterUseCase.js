import { createRegisterCredentials } from '../entities/AuthCredentials.js';

export const createRegisterUseCase = (authRepository) => {
  const execute = async (firstName, lastName, login, password) => {
    try {
      const credentials = createRegisterCredentials(firstName, lastName, login, password);
      const user = await authRepository.register(credentials);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { execute };
}; 