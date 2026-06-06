# WeatherAI Demo

I built this to explore the WeatherAI developer platform and see how their APIs work
in practice. The goal was straightforward: pick a couple of endpoints, consume the
data they return, and translate that into something clean and functional.

I ended up integrating two APIs. The first is the weather endpoint, where I take a
city name, resolve it to coordinates, and pull live conditions plus a 7-day forecast
with an optional Gemini AI summary. The second is the tree analysis endpoint, where
I upload drone, aerial, or satellite images of trees/forests and get back tree count, canopy health, and AI-generated
observations and recommendations. Seeing how differently the two APIs behave, one a
standard GET with query params and the other a multipart POST with image data, was
the more interesting part of the exercise.

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


## Getting Started

Install dependencies:

    npm install

Start the development server:

    npm run dev

Open http://localhost:5173 in your browser.

Paste your WeatherAI API key (starts with wai_) into the input at the top of the app.
The indicator dot turns green when the key format is valid.

You can get a free API key at https://weather-ai.co.


## Build for Production

    npm run build

Output is written to the dist/ folder and can be deployed to any static host.


## Author

Giovanni Tonucci
