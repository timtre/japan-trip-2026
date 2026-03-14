# Japan 2026 — Kyoto & Okinawa

Interactive single-page travel companion for an 8-day Japan trip (Apr 20–27, 2026). Four days in Kyoto exploring temples, onsen, and shojin ryori, followed by four days in Okinawa with beaches, rainforest, and Blue Zone cuisine. 100% vegan.

## Features

- **Day-by-day itinerary** with timeline layout, activity details, and alternative options
- **Interactive Google Maps** with 50+ color-coded markers, Places API search, and live place details
- **Vegan restaurant guide** — 23 restaurants with category filters, ratings, and hours
- **Practical info** — transport, budget table, insider tips, vegan survival tips
- **Booking checklist** — interactive checkboxes persisted to localStorage
- **Live countdown** to departure day
- **Responsive** — split layout on desktop, stacked with collapsible map on mobile

## Tech Stack

- Vite + vanilla TypeScript
- Custom CSS with design tokens (no framework)
- Google Maps JavaScript API + Places API
- Google Fonts: Noto Serif JP + Inter

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Google Maps (optional)

To enable the interactive map, create a `.env` file:

```
VITE_GOOGLE_MAPS_API_KEY=your-key-here
```

Get a key from the [Google Cloud Console](https://console.cloud.google.com/) with **Maps JavaScript API** and **Places API** enabled. The app works without it — you'll see a placeholder instead of the map.

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview production build
```

## Project Structure

```
src/
├── data/           # Trip data: locations, itinerary, restaurants, practical info
├── map/            # Google Maps init, markers, Places API, filtering
├── components/     # UI: hero, nav, day cards, restaurant guide, practical section
├── styles/         # CSS: variables, reset, layout, component styles, animations
└── utils/          # Scroll tracking, localStorage helpers
```
