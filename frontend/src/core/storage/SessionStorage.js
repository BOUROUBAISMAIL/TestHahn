export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const removeToken = () => {
  sessionStorage.removeItem('token');
};

export const setUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  sessionStorage.removeItem('user');
};

export const clear = () => {
  sessionStorage.clear();
};

export const isAuthenticated = () => {
  return !!getToken();
}; 