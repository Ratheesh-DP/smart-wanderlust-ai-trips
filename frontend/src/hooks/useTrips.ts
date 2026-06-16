'use client';

import { useState, useEffect } from 'react';
import { tripsApi } from '@/services/api';
import type { Trip } from '@/types';

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripsApi.getAll();
      setTrips(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const createTrip = async (tripData: Partial<Trip>) => {
    try {
      const newTrip = await tripsApi.create(tripData);
      setTrips((prev) => [...prev, newTrip]);
      return newTrip;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create trip');
    }
  };

  const updateTrip = async (id: string, tripData: Partial<Trip>) => {
    try {
      const updatedTrip = await tripsApi.update(id, tripData);
      setTrips((prev) => prev.map((t) => (t.id === id ? updatedTrip : t)));
      return updatedTrip;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update trip');
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      await tripsApi.delete(id);
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete trip');
    }
  };

  return {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
  };
}
