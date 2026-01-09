import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const processGraph = async (nodes, edges) => {
  const payload = { nodes, edges };
  const response = await axios.post(`${BASE_URL}/process`, payload);
  return response.data;
};