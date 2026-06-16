'use client';

import type { BudgetForecast } from '@/types';

interface BudgetTrackerProps {
  forecast: BudgetForecast | null;
}

export default function BudgetTracker({ forecast }: BudgetTrackerProps) {
  if (!forecast) {
    return (
      <div className="text-center py-8 text-gray-500">
        Enter your trip details to get a budget forecast.
      </div>
    );
  }

  const breakdownItems = [
    { label: 'Accommodation', value: forecast.breakdown.accommodation, color: 'bg-blue-500' },
    { label: 'Food & Dining', value: forecast.breakdown.food, color: 'bg-green-500' },
    { label: 'Transportation', value: forecast.breakdown.transportation, color: 'bg-yellow-500' },
    { label: 'Activities', value: forecast.breakdown.activities, color: 'bg-purple-500' },
    { label: 'Shopping', value: forecast.breakdown.shopping, color: 'bg-pink-500' },
    { label: 'Miscellaneous', value: forecast.breakdown.miscellaneous, color: 'bg-gray-500' },
  ];

  const totalBreakdown = breakdownItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">Budget Forecast</h3>
        <p className="text-sm text-gray-600">
          {forecast.destination} • {forecast.days} days
        </p>
      </div>

      <div className="text-center p-4 bg-primary-50 rounded-lg">
        <div className="text-3xl font-bold text-primary-600">
          ${forecast.budget.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Estimated Total Budget</div>
      </div>

      <div className="space-y-3">
        {breakdownItems.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium">${item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full`}
                style={{
                  width: `${(item.value / totalBreakdown) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Confidence Score</span>
          <span className="font-semibold text-primary-600">
            {Math.round(forecast.confidence * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
