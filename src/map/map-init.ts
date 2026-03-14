import { Loader } from '@googlemaps/js-api-loader';
import { smoothFlyTo } from './map-fly-to';

let map: google.maps.Map | null = null;
let placesService: google.maps.places.PlacesService | null = null;

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#f5f2ed' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#4a5568' }] },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#4a9e8e' }, { lightness: 40 }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4a9e8e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#e8e4df' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ddd8d2' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#c8e6c9' }, { lightness: 20 }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'simplified' }],
  },
];

const KYOTO_CENTER = { lat: 35.0116, lng: 135.7681 };
const OKINAWA_CENTER = { lat: 26.3344, lng: 127.8056 };

export { KYOTO_CENTER, OKINAWA_CENTER };

export async function initMap(containerId: string): Promise<google.maps.Map | null> {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'your-key-here') {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div class="map-placeholder">
          <div class="map-placeholder-icon">🗺</div>
          <p class="map-placeholder-text">Map requires a Google Maps API key</p>
          <p class="map-placeholder-hint">Add your key to <code>.env</code> as <code>VITE_GOOGLE_MAPS_API_KEY</code></p>
        </div>
      `;
    }
    return null;
  }

  const loader = new Loader({
    apiKey,
    version: 'weekly',
    libraries: ['places', 'marker'],
  });

  await loader.load();

  map = new google.maps.Map(document.getElementById(containerId)!, {
    center: KYOTO_CENTER,
    zoom: 13,
    styles: MAP_STYLES,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    gestureHandling: 'greedy',
  });

  placesService = new google.maps.places.PlacesService(map);

  return map;
}

export function getMap(): google.maps.Map | null {
  return map;
}

export function getPlacesService(): google.maps.places.PlacesService | null {
  return placesService;
}

export function panToRegion(region: 'kyoto' | 'okinawa'): void {
  if (!map) return;
  const center = region === 'kyoto' ? KYOTO_CENTER : OKINAWA_CENTER;
  const finalZoom = region === 'kyoto' ? 13 : 11;
  smoothFlyTo(map, center, finalZoom);
}
