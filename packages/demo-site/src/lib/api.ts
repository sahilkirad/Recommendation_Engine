// File: packages/demo-site/src/lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Your FastAPI backend address
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;