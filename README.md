# WeatherAI API INTERGRATION

Live demo: https://weatherai-api-integration.vercel.app/

I built this to explore the WeatherAI developer platform and see how their APIs work
in practice. The goal was straightforward: pick a couple of endpoints, consume the
data they return, and translate that into something clean and functional.

I ended up integrating two APIs. The first is the weather endpoint, where I take a
city name, resolve it to coordinates, and pull live conditions plus a 7-day forecast
with an optional Gemini AI summary. The second is the tree analysis endpoint, where
I upload a drone, aerial, or satellite images of forest or tree cover and get back tree count, canopy health, and
AI-generated observations and recommendations. Seeing how differently the two APIs
behave, one a standard GET with query params and the other a multipart POST with
image data, was the more interesting part of the exercise.

The UI is mobile-first, around 390px wide, so it feels native on a phone while
still working on desktop.


## Tech Stack

- React 18
- Vite
- CSS Modules
- WeatherAI REST API
- OpenStreetMap Nominatim (city name to coordinates)


## Project Structure

    src/
      api.js                    All API calls: geocoding, weather, and tree analysis
      App.jsx                   Root layout, tab navigation, API key state
      App.module.css
      components/
        WeatherTab.jsx          City search, weather display, forecast, AI summary
        WeatherTab.module.css
        ForestryTab.jsx         Image upload, metadata form, tree analysis results
        ForestryTab.module.css
      index.css                 Global CSS variables and base styles
      main.jsx
    vercel.json                 Vercel rewrite rules for production API proxying


## Getting Started

Install dependencies:

    npm install

Start the development server:

    npm run dev

Open http://localhost:5173 in your browser.

Paste your WeatherAI API key (starts with wai_) into the input at the top of the app.
The indicator dot turns green when the key format is valid.

You can get a free API key at https://weather-ai.co.


## Deploying to Vercel

The project is configured for Vercel out of the box.

In local development, Vite proxies API requests through its dev server to avoid CORS
restrictions. In production that proxy does not exist, so vercel.json handles the same
job by rewriting any request to /weatherai/* through to the WeatherAI API server-side.
No changes to the application code are needed between environments.

To deploy:

1. Push the project to a GitHub repository.

2. Go to https://vercel.com, create an account if you do not have one, and click
   Add New Project.

3. Import your GitHub repository. Vercel will auto-detect Vite and set the build
   command and output directory for you.

4. Click Deploy. Vercel will build the project and give you a live URL.

The app does not require any environment variables to be set on Vercel. The API key
is entered by the user at runtime directly in the app.


## Author

Giovanni Tonucci
