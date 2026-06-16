import os
from openai import OpenAI


class ItineraryGenerator:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.model = "gpt-4"

    def generate(
        self,
        destination: str,
        start_date: str,
        end_date: str,
        budget: float,
        interests: list[str],
        pace: str = "moderate",
        special_requests: str = "",
    ) -> dict:
        prompt = self._build_prompt(
            destination, start_date, end_date, budget, interests, pace, special_requests
        )

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert travel planner. Create detailed, personalized "
                        "travel itineraries. Be specific with times, locations, and costs. "
                        "Consider travel time between activities. Return JSON format."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=4000,
        )

        return self._parse_response(response.choices[0].message.content)

    def _build_prompt(
        self,
        destination: str,
        start_date: str,
        end_date: str,
        budget: float,
        interests: list[str],
        pace: str,
        special_requests: str,
    ) -> str:
        days_text = f"from {start_date} to {end_date}"
        interests_text = ", ".join(interests) if interests else "general sightseeing"

        prompt = f"""Create a detailed travel itinerary for {destination} {days_text}.

Traveler preferences:
- Budget: ${budget}
- Interests: {interests_text}
- Pace: {pace}
{f"- Special requests: {special_requests}" if special_requests else ""}

Please provide a JSON response with the following structure:
{{
  "destination": "{destination}",
  "days": [
    {{
      "day_number": 1,
      "date": "{start_date}",
      "activities": [
        {{
          "time": "09:00",
          "activity": "Activity name",
          "location": "Location name",
          "description": "Brief description",
          "estimated_cost": 0,
          "category": "sightseeing|food|transport|activity|shopping",
          "duration_minutes": 60
        }}
      ]
    }}
  ],
  "total_estimated_cost": 0,
  "tips": ["Useful tip 1", "Useful tip 2"]
}}

Include practical details like opening hours, travel time between locations, and meal recommendations. Keep activities within the specified pace ({pace})."""
        return prompt

    def _parse_response(self, response_text: str) -> dict:
        import json
        try:
            start = response_text.find('{')
            end = response_text.rfind('}') + 1
            if start != -1 and end != -1:
                return json.loads(response_text[start:end])
        except json.JSONDecodeError:
            pass
        return {"raw_response": response_text}
