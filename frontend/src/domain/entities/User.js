export const createUser = (id, firstName, lastName, login, token = null) => ({
  id,
  firstName,
  lastName,
  login,
  token,
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  isAuthenticated() {
    return !!this.token;
  }
});

export const getUserFullName = (user) => `${user.firstName} ${user.lastName}`;

export const isUserAuthenticated = (user) => !!user.token; 