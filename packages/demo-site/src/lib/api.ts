// File: packages/demo-site/src/lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Your FastAPI backend address
  headers: {
    'Content-Type': 'application/json',
    // Read the API Key from the environment and set it as a header
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
  },
});

export default apiClient;