import { LoginRequest, RegisterRequest, AuthResponse, UserProfile } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const authService = {
  /**
   * User login
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw { 
          message: data.message || 'Login failed', 
          status: response.status 
        };
      }

      return data;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw { message: 'Network error. Please check your connection.', status: 0 };
    }
  },
  
  /**
   * User registration
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw { 
          message: data.message || 'Registration failed', 
          status: response.status 
        };
      }

      return data;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw { message: 'Network error. Please check your connection.', status: 0 };
    }
  },
  
  /**
   * Get user profile
   */
  getUserProfile: async (): Promise<UserProfile> => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw { message: 'Authentication required', status: 401 };
      }
      
      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle token expiration
      if (response.status === 401) {
        localStorage.removeItem('token');
        throw { message: 'Session expired. Please login again.', status: 401 };
      }

      const data = await response.json();

      if (!response.ok) {
        throw { 
          message: data.message || 'Failed to fetch profile', 
          status: response.status 
        };
      }

      return data;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw { message: 'Network error. Please check your connection.', status: 0 };
    }
  },
  
  /**
   * Check if user is authenticated
   */
  checkAuth: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return false;
      }
      
      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        return false;
      }

      return response.ok;
    } catch {
      return false;
    }
  }
};