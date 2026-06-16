'use client';

import { useState } from 'react';
import { itineraryApi } from '@/services/api';
import type { GenerateItineraryRequest, GenerateItineraryResponse, OptimizationRequest, OptimizedRoute } from '@/types';

export function useItinerary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateItinerary = async (request: GenerateItineraryRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await itineraryApi.generate(request);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate itinerary';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const optimizeRoute = async (request: OptimizationRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await itineraryApi.optimize(request);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to optimize route';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateItinerary,
    optimizeRoute,
  };
}
