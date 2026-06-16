export interface User {
  id: string;
  name: string;
  email: string;
  budget: number;
  travelStyle: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  interests: string[];
  pace: 'relaxed' | 'moderate' | 'fast';
  accommodation: 'budget' | 'mid-range' | 'luxury';
  dietaryRestrictions?: string[];
  accessibility?: string[];
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  spent: number;
  status: 'planning' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  itineraries: Itinerary[];
  createdAt: string;
}

export interface Itinerary {
  id: string;
  tripId: string;
  dayNumber: number;
  activity: string;
  description?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  estimatedCost: number;
  actualCost: number;
  startTime?: string;
  endTime?: string;
  category: string;
  priority: number;
  isBooked: boolean;
  bookingReference?: string;
}

export interface Recommendation {
  id: string;
  userId: string;
  destination: string;
  score: number;
  reason: string;
  category: string;
  metadata: Record<string, unknown>;
}

export interface Review {
  id: string;
  userId: string;
  tripId: string;
  rating: number;
  title: string;
  comment: string;
  pros?: string;
  cons?: string;
  visitDate: string;
  createdAt: string;
}

export interface GenerateItineraryRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  pace: string;
  specialRequests?: string;
}

export interface GenerateItineraryResponse {
  trip: Trip;
  itinerary: Itinerary[];
  totalEstimatedCost: number;
}

export interface OptimizationRequest {
  locations: Location[];
  startDate: string;
  endDate: string;
  startLocation?: Location;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  duration?: number;
}

export interface OptimizedRoute {
  locations: Location[];
  totalDistance: number;
  totalDuration: number;
  optimizedOrder: number[];
}

export interface BudgetForecast {
  destination: string;
  days: number;
  budget: number;
  breakdown: BudgetBreakdown;
  confidence: number;
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transportation: number;
  activities: number;
  shopping: number;
  miscellaneous: number;
}
