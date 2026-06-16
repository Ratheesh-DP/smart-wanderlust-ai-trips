'use client';

import type { Recommendation } from '@/types';

interface RecommendationListProps {
  recommendations: Recommendation[];
  onSelect?: (destination: string) => void;
}

const categoryColors: Record<string, string> = {
  cultural: 'bg-amber-100 text-amber-800',
  adventure: 'bg-green-100 text-green-800',
  luxury: 'bg-purple-100 text-purple-800',
  beach: 'bg-blue-100 text-blue-800',
  city: 'bg-gray-100 text-gray-800',
  nature: 'bg-emerald-100 text-emerald-800',
};

export default function RecommendationList({
  recommendations,
  onSelect,
}: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recommendations available yet. Start planning trips to get personalized suggestions!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div
          key={rec.id}
          className="card flex items-center justify-between cursor-pointer hover:border-primary-300 border-2 border-transparent"
          onClick={() => onSelect?.(rec.destination)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {rec.destination}
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  categoryColors[rec.category] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {rec.category}
              </span>
            </div>
            <p className="text-sm text-gray-600">{rec.reason}</p>
          </div>

          <div className="ml-4 flex items-center">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(rec.score * 100)}%
              </div>
              <div className="text-xs text-gray-500">Match</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
