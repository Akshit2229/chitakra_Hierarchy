import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000 // 5 seconds timeout
});

/**
 * Sends edge data to the backend /bfhl endpoint.
 * 
 * @param {String[]} edges - Array of raw or cleaned edge strings (e.g. ["A->B", "B->C"])
 * @returns {Promise<Object>} API response body
 */
export const processGraph = async (edges) => {
  const response = await apiClient.post('/bfhl', { data: edges });
  return response.data;
};
