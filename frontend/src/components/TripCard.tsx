'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import type { Trip } from '@/types';

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
}

const statusColors: Record<string, string> = {
  planning: 'badge-warning',
  confirmed: 'badge-primary',
  active: 'badge-success',
  completed: 'badge-secondary',
  cancelled: 'badge-error',
};

export default function TripCard({ trip, onDelete }: TripCardProps) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{trip.title}</h3>
          <p className="text-gray-600">{trip.destination}</p>
        </div>
        <span className={`badge ${statusColors[trip.status] || 'badge-primary'}`}>
          {trip.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-20 font-medium">Dates:</span>
          <span>
            {format(new Date(trip.startDate), 'MMM d')} -{' '}
            {format(new Date(trip.endDate), 'MMM d, yyyy')}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-20 font-medium">Budget:</span>
          <span>${trip.totalBudget.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-20 font-medium">Spent:</span>
          <span>${trip.spent.toLocaleString()}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${Math.min((trip.spent / trip.totalBudget) * 100, 100)}%`,
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={`/trips/${trip.id}`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          View Details
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(trip.id)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
