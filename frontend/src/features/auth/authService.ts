import axios from 'axios';

const API_URL = '/api/users';

// Register User
const register = async (userData: userRegister): Promise<User | string> => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login User
const login = async (userData: userLogin): Promise<User | string> => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
