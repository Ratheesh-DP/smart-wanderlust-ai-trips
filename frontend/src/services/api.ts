import axios from 'axios';
import type {
  Trip,
  Recommendation,
  GenerateItineraryRequest,
  GenerateItineraryResponse,
  OptimizationRequest,
  OptimizedRoute,
  BudgetForecast,
  User,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const aiApi = axios.create({
  baseURL: AI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authApi = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data as User;
  },
};

export const tripsApi = {
  getAll: async () => {
    const response = await api.get('/api/trips');
    return response.data as Trip[];
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/trips/${id}`);
    return response.data as Trip;
  },
  create: async (data: Partial<Trip>) => {
    const response = await api.post('/api/trips', data);
    return response.data as Trip;
  },
  update: async (id: string, data: Partial<Trip>) => {
    const response = await api.put(`/api/trips/${id}`, data);
    return response.data as Trip;
  },
  delete: async (id: string) => {
    await api.delete(`/api/trips/${id}`);
  },
};

export const recommendationsApi = {
  getForUser: async (userId: string) => {
    const response = await aiApi.post('/api/recommendations', { userId });
    return response.data as Recommendation[];
  },
  getByDestination: async (destination: string) => {
    const response = await aiApi.get(`/api/recommendations/${encodeURIComponent(destination)}`);
    return response.data as Recommendation[];
  },
};

export const itineraryApi = {
  generate: async (data: GenerateItineraryRequest) => {
    const response = await aiApi.post('/api/itinerary/generate', data);
    return response.data as GenerateItineraryResponse;
  },
  optimize: async (data: OptimizationRequest) => {
    const response = await aiApi.post('/api/optimize/route', data);
    return response.data as OptimizedRoute;
  },
};

export const forecastApi = {
  predictBudget: async (data: { destination: string; days: number; budget: number }) => {
    const response = await aiApi.post('/api/forecast/budget', data);
    return response.data as BudgetForecast;
  },
};

export const nlpApi = {
  parseQuery: async (query: string) => {
    const response = await aiApi.post('/api/nlp/parse', { query });
    return response.data;
  },
};

export default api;
