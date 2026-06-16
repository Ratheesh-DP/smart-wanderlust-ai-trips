INSERT INTO users (id, name, email, password_hash, budget, travel_style, preferences) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'John Doe', 'john@example.com', '$2b$10$hashedpassword1', 5000, 'adventure', '{"interests": ["hiking", "photography", "local food"], "pace": "moderate", "accommodation": "mid-range"}'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Jane Smith', 'jane@example.com', '$2b$10$hashedpassword2', 3000, 'cultural', '{"interests": ["museums", "history", "art"], "pace": "relaxed", "accommodation": "budget"}'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Mike Johnson', 'mike@example.com', '$2b$10$hashedpassword3', 8000, 'luxury', '{"interests": ["fine dining", "spa", "shopping"], "pace": "luxury", "accommodation": "luxury"}');

INSERT INTO trips (id, user_id, title, destination, start_date, end_date, total_budget, status) VALUES
('d4e5f6a7-b8c9-0123-defa-234567890123', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Tokyo Adventure', 'Tokyo, Japan', '2025-03-15', '2025-03-22', 4000, 'completed'),
('e5f6a7b8-c9d0-1234-efab-345678901234', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Paris Cultural Tour', 'Paris, France', '2025-04-10', '2025-04-17', 3000, 'completed'),
('f6a7b8c9-d0e1-2345-fabc-456789012345', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Maldives Luxury Escape', 'Maldives', '2025-05-01', '2025-05-08', 7500, 'completed');

INSERT INTO itineraries (trip_id, day_number, activity, location, latitude, longitude, estimated_cost, start_time, end_time, category) VALUES
('d4e5f6a7-b8c9-0123-defa-234567890123', 1, 'Visit Senso-ji Temple', 'Asakusa, Tokyo', 35.7148, 139.7967, 0, '09:00', '11:00', 'sightseeing'),
('d4e5f6a7-b8c9-0123-defa-234567890123', 1, 'Lunch at Tsukiji Outer Market', 'Tsukiji, Tokyo', 35.6654, 139.7707, 30, '12:00', '13:30', 'food'),
('d4e5f6a7-b8c9-0123-defa-234567890123', 1, 'Explore Shibuya Crossing', 'Shibuya, Tokyo', 35.6595, 139.7004, 0, '14:00', '16:00', 'sightseeing'),
('e5f6a7b8-c9d0-1234-efab-345678901234', 1, 'Visit Louvre Museum', 'Paris, France', 48.8606, 2.3376, 17, '10:00', '14:00', 'museum'),
('e5f6a7b8-c9d0-1234-efab-345678901234', 1, 'Seine River Cruise', 'Seine, Paris', 48.8566, 2.3522, 15, '15:00', '17:00', 'activity');

INSERT INTO recommendations (user_id, destination, score, reason, category) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kyoto, Japan', 0.95, 'Based on your love for traditional culture and temples', 'cultural'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Bali, Indonesia', 0.88, 'Perfect for adventure and nature lovers', 'adventure'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Rome, Italy', 0.92, 'Rich history and world-class museums', 'cultural'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Florence, Italy', 0.87, 'Art and architecture paradise', 'cultural'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Santorini, Greece', 0.94, 'Luxury resorts and stunning views', 'luxury'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Dubai, UAE', 0.91, 'Ultimate luxury experience', 'luxury');

INSERT INTO reviews (user_id, trip_id, rating, title, comment, pros, cons, visit_date) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd4e5f6a7-b8c9-0123-defa-234567890123', 5, 'Amazing Tokyo Trip!', 'The itinerary was perfect. Every recommendation was spot on.', 'Great food recommendations, efficient route planning', 'Some activities were a bit rushed', '2025-03-22'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'e5f6a7b8-c9d0-1234-efab-345678901234', 4, 'Wonderful Paris Experience', 'Loved the cultural recommendations and museum visits.', 'Perfect museum timings, great restaurant picks', 'Could use more local neighborhood suggestions', '2025-04-17');
