import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadRecording = (formData) => {
  return api.post('/recordings', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getRecordings = () => {
  return api.get('/recordings');
};

export const getRecordingUrl = (id) => {
  return `${API_BASE_URL}/recordings/${id}`;
};