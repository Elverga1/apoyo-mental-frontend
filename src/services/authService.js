// src/services/authService.js
import axios from 'axios';

// Usar directamente la URL de producción en Render
const API_URL = 'https://apoyo-mental-api-1.onrender.com';

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
      // Guardar token y username
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('username', username);
      
      // Verificar que se guardó correctamente
      const tokenSaved = localStorage.getItem('token');
      console.log('Token guardado:', tokenSaved ? 'Sí' : 'No');
      console.log('Username guardado:', localStorage.getItem('username'));
      
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
