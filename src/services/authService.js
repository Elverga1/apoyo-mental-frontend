// src/services/authService.js
import axios from 'axios';

// Usar directamente la URL de producción en Render
const API_URL = 'https://apoyo-mental-api.onrender.com';

class AuthService {
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email: userData.email,
        username: userData.username,
        full_name: userData.fullName,
        password: userData.password
      });
      console.log('Registro exitoso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data);
      throw error.response?.data || { detail: 'Error en el registro' };
    }
  }

  async login(username, password) {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await axios.post(`${API_URL}/login`, formData);
      
      console.log('Login response:', response.data);
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', username);
        console.log('Token guardado correctamente');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message);
      throw error.response?.data || { detail: 'Error en el login' };
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    console.log('Sesión cerrada');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}

export default new AuthService();
