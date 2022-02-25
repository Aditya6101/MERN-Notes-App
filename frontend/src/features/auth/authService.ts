import axios from 'axios';

const API_URL = '/api/users';

// Register User
// todo resolve unknown
const register = async (userData: unknown) => {
  const response = await axios.post(`${API_URL}/register`, userData);

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
  logout,
};

export default authService;
