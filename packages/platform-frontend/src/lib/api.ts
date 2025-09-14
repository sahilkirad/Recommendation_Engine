// File: packages/platform-frontend/src/lib/api.ts
import axios from 'axios';

// The base URL of our FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// In the future, we can add interceptors here to automatically
// handle things like adding authentication tokens to every request.

export default apiClient;