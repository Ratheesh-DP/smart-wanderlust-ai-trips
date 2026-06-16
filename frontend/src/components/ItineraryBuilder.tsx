'use client';

import { useState } from 'react';
import { useItinerary } from '@/hooks/useItinerary';
import type { GenerateItineraryRequest, Itinerary } from '@/types';

interface ItineraryBuilderProps {
  tripId: string;
  destination: string;
  onComplete: (itinerary: Itinerary[]) => void;
}

export default function ItineraryBuilder({
  tripId,
  destination,
  onComplete,
}: ItineraryBuilderProps) {
  const { loading, error, generateItinerary } = useItinerary();
  const [form, setForm] = useState<GenerateItineraryRequest>({
    destination,
    startDate: '',
    endDate: '',
    budget: 1000,
    interests: [],
    pace: 'moderate',
    specialRequests: '',
  });

  const interestOptions = [
    'Culture & History',
    'Food & Dining',
    'Adventure & Sports',
    'Nature & Wildlife',
    'Shopping',
    'Nightlife',
    'Photography',
    'Wellness & Spa',
  ];

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await generateItinerary(form);
      onComplete(result.itinerary);
    } catch (err) {
      console.error('Failed to generate itinerary:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Start Date</label>
          <input
            type="date"
            className="input"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">End Date</label>
          <input
            type="date"
            className="input"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label className="label">Budget (USD)</label>
        <input
          type="number"
          className="input"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
          min={100}
          required
        />
      </div>

      <div>
        <label className="label">Travel Pace</label>
        <select
          className="input"
          value={form.pace}
          onChange={(e) => setForm({ ...form, pace: e.target.value })}
        >
          <option value="relaxed">Relaxed - Take your time</option>
          <option value="moderate">Moderate - Balanced schedule</option>
          <option value="fast">Fast - See as much as possible</option>
        </select>
      </div>

      <div>
        <label className="label">Interests</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                form.interests.includes(interest)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Special Requests (Optional)</label>
        <textarea
          className="input"
          rows={3}
          value={form.specialRequests}
          onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
          placeholder="Any specific requirements or preferences..."
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating Itinerary...' : 'Generate AI Itinerary'}
      </button>
    </form>
  );
}
