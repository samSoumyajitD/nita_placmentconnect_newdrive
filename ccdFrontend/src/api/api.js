import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addJob = async (jobData) => {
  try {
    const response = await apiClient.post('/add-job', jobData);
    return response.data;
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await apiClient.get('/all-jobs');
    return response.data;
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
};

export const getJobById = async (id) => {
  try {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting job by ID:', error);
    throw error;
  }
};

export const updateJob = async (id, updatedData) => {
  try {
    const response = await apiClient.patch(`/job/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await apiClient.delete(`/job/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

export const downloadCSV = async (attributes) => {
  try {
    const response = await apiClient.get('/download-csv', {
      params: { attributes: attributes.join(',') },
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'jobs.csv');
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error downloading CSV:', error);
    throw error;
  }
};

// Add these functions for sign-up and login
export const signUp = async (userData) => {
  try {
    const response = await apiClient.post('/sign-up', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const requestPasswordReset = async (data) => {
  try {
    const response = await apiClient.post('/request-password-reset', data);
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

export const resetPassword = async (token, data) => {
  try {
    const response = await apiClient.post(`/reset-password/${token}`, data);
    alert('Password Reset Successful');
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
