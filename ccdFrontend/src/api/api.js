// src/api/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const addJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/add-job`, jobData);
    return response.data;
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/all-jobs`);
    return response.data;
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
};

export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting job by ID:', error);
    throw error;
  }
};

export const updateJob = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/job/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/job/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

export const downloadCSV = async (attributes) => {
  try {
    const response = await axios.get(`${API_URL}/download-csv`, {
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

