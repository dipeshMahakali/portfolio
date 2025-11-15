import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Health check
  healthCheck: () => apiClient.get('/'),

  // Auth
  auth: {
    login: (password) => apiClient.post('/auth/login', { password }),
    verify: () => apiClient.get('/auth/verify'),
  },

  // Personal Info
  personalInfo: {
    get: () => apiClient.get('/personal-info'),
    update: (data) => apiClient.put('/personal-info', data),
  },

  // Projects
  projects: {
    getAll: () => apiClient.get('/projects'),
    create: (data) => apiClient.post('/projects', data),
    update: (id, data) => apiClient.put(`/projects/${id}`, data),
    delete: (id) => apiClient.delete(`/projects/${id}`),
  },

  // Work Experience
  workExperience: {
    getAll: () => apiClient.get('/work-experience'),
    create: (data) => apiClient.post('/work-experience', data),
    update: (id, data) => apiClient.put(`/work-experience/${id}`, data),
    delete: (id) => apiClient.delete(`/work-experience/${id}`),
  },

  // Testimonials
  testimonials: {
    getAll: () => apiClient.get('/testimonials'),
    create: (data) => apiClient.post('/testimonials', data),
    update: (id, data) => apiClient.put(`/testimonials/${id}`, data),
    delete: (id) => apiClient.delete(`/testimonials/${id}`),
  },

  // Skills
  skills: {
    get: () => apiClient.get('/skills'),
    update: (data) => apiClient.put('/skills', data),
  },

  // Approach
  approach: {
    get: () => apiClient.get('/approach'),
    update: (data) => apiClient.put('/approach', data),
  },

  // Contact
  contact: {
    send: (data) => apiClient.post('/contact', data),
    getAll: () => apiClient.get('/contact'),
    markAsRead: (id) => apiClient.put(`/contact/${id}/read`),
    delete: (id) => apiClient.delete(`/contact/${id}`),
  },
};

export default api;
