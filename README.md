# Weather App with Convex and React

## Setup

1. Rename `.env.local.example` to `.env.local`.
2. Fill in your OpenWeather API key (`OPENWEATHER_API_KEY`).
3. Fill in your Convex deployment info (`CONVEX_DEPLOYMENT` and `VITE_CONVEX_URL`).
4. Run `npm install`.
5. Run `npm run dev` to start frontend and backend.

## Usage

- Enter city and country (ISO code) to fetch weather data.
- Data is cached in Convex DB.

## Notes

- No authentication included.
- Uses Convex actions to fetch weather data and store it.
