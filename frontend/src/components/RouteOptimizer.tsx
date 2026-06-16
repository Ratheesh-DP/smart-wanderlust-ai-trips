'use client';

import { useState } from 'react';
import { useItinerary } from '@/hooks/useItinerary';
import type { Location, OptimizedRoute } from '@/types';

interface RouteOptimizerProps {
  initialLocations?: Location[];
  onOptimized?: (route: OptimizedRoute) => void;
}

export default function RouteOptimizer({
  initialLocations = [],
  onOptimized,
}: RouteOptimizerProps) {
  const { loading, error, optimizeRoute } = useItinerary();
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [newLocation, setNewLocation] = useState({ name: '', latitude: 0, longitude: 0 });

  const addLocation = () => {
    if (newLocation.name) {
      setLocations((prev) => [...prev, { ...newLocation }]);
      setNewLocation({ name: '', latitude: 0, longitude: 0 });
    }
  };

  const removeLocation = (index: number) => {
    setLocations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOptimize = async () => {
    if (locations.length < 2) return;

    try {
      const route = await optimizeRoute({
        locations,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
      onOptimized?.(route);
    } catch (err) {
      console.error('Failed to optimize route:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="input flex-1"
          placeholder="Location name"
          value={newLocation.name}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
        />
        <input
          type="number"
          className="input w-24"
          placeholder="Lat"
          value={newLocation.latitude || ''}
          onChange={(e) =>
            setNewLocation({ ...newLocation, latitude: Number(e.target.value) })
          }
        />
        <input
          type="number"
          className="input w-24"
          placeholder="Lng"
          value={newLocation.longitude || ''}
          onChange={(e) =>
            setNewLocation({ ...newLocation, longitude: Number(e.target.value) })
          }
        />
        <button type="button" onClick={addLocation} className="btn-primary">
          Add
        </button>
      </div>

      <div className="space-y-2">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <span className="font-medium">{loc.name}</span>
              <span className="text-sm text-gray-500 ml-2">
                ({loc.latitude}, {loc.longitude})
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeLocation(index)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {locations.length < 2 && (
        <p className="text-sm text-gray-500">
          Add at least 2 locations to optimize the route.
        </p>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      <button
        onClick={handleOptimize}
        disabled={loading || locations.length < 2}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Optimizing Route...' : 'Optimize Route'}
      </button>
    </div>
  );
}
