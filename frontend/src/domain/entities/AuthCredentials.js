// AuthCredentials as function-based factory functions
export const createAuthCredentials = (login, password) => ({
  login,
  password
});

export const createRegisterCredentials = (firstName, lastName, login, password) => ({
  firstName,
  lastName,
  login,
  password
}); 