import { locations, type Location } from '../data/locations';
import { getMap, getPlacesService } from './map-init';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { smoothFlyTo } from './map-fly-to';

const markerColors: Record<string, string> = {
  temple: '#c85a4a',
  garden: '#4a9e8e',
  restaurant: '#e07c5a',
  cafe: '#d4a853',
  nature: '#5b8c5a',
  beach: '#2d7eb5',
  market: '#8b6914',
  onsen: '#9b59b6',
  landmark: '#c85a4a',
  transport: '#64748b',
};

let markers: Map<string, google.maps.Marker> = new Map();
let clusterer: MarkerClusterer | null = null;
let infoWindow: google.maps.InfoWindow | null = null;
let searchMarkers: google.maps.Marker[] = [];
let lastPosition: google.maps.LatLngLiteral | null = null;
let activeTravelLine: google.maps.Polyline | null = null;
let travelLineTimeout: ReturnType<typeof setTimeout> | null = null;
const photoCache: Map<string, string | null> = new Map();

function createMarkerIcon(type: string): google.maps.Symbol {
  const color = markerColors[type] || '#4a9e8e';
  return {
    path: 'M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#fff',
    strokeWeight: 2,
    scale: 1.4,
    anchor: new google.maps.Point(12, 36),
  };
}

// Custom cluster renderer to match the app's warm aesthetic
function clusterRenderer(
  { count, position }: { count: number; position: google.maps.LatLng },
  _stats: unknown,
) {
  const size = count < 10 ? 40 : count < 20 ? 48 : 56;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#c85a4a" opacity="0.85"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 4}" fill="#c85a4a" opacity="1"/>
      <text x="${size / 2}" y="${size / 2}" text-anchor="middle" dy="0.35em"
            font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="white">
        ${count}
      </text>
    </svg>`;

  return new google.maps.Marker({
    position,
    icon: {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(size, size),
      anchor: new google.maps.Point(size / 2, size / 2),
    },
    zIndex: 1000 + count,
  });
}

export function createMarkers(): void {
  const map = getMap();
  if (!map) return;

  infoWindow = new google.maps.InfoWindow();

  const allMarkers: google.maps.Marker[] = [];

  locations.forEach((loc) => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      title: loc.name,
      icon: createMarkerIcon(loc.type),
    });

    marker.addListener('click', () => {
      openInfoWindow(loc, marker);
      highlightActivity(loc.id);
    });

    markers.set(loc.id, marker);
    allMarkers.push(marker);
  });

  // Initialize marker clustering
  clusterer = new MarkerClusterer({
    map,
    markers: allMarkers,
    renderer: { render: clusterRenderer },
  });
}

async function searchPlace(
  name: string,
  location: google.maps.LatLngLiteral,
): Promise<google.maps.places.Place | null> {
  try {
    const { places } = await google.maps.places.Place.searchByText({
      textQuery: name,
      locationBias: new google.maps.Circle({
        center: location,
        radius: 500,
      }),
      fields: ['photos', 'displayName', 'formattedAddress', 'rating',
               'reviews', 'regularOpeningHours', 'websiteURI', 'googleMapsURI',
               'internationalPhoneNumber'],
      maxResultCount: 1,
    });
    return places?.[0] ?? null;
  } catch {
    return null;
  }
}

async function fetchPlacePhoto(loc: Location): Promise<string | null> {
  const place = await searchPlace(loc.name, { lat: loc.lat, lng: loc.lng });
  if (place?.photos && place.photos.length > 0) {
    return place.photos[0].getURI({ maxWidth: 300 });
  }
  return null;
}

export async function fetchPlacePhotoUrl(
  name: string,
  coords: { lat: number; lng: number },
  maxWidth = 600,
): Promise<string | null> {
  const cacheKey = `photo:${name}`;
  if (photoCache.has(cacheKey)) return photoCache.get(cacheKey) ?? null;

  const service = getPlacesService();
  if (!service) return null;

  return new Promise((resolve) => {
    service.findPlaceFromQuery(
      {
        query: `${name} ${coords.lat.toFixed(2)},${coords.lng.toFixed(2)}`,
        fields: ['photos'],
        locationBias: new google.maps.LatLng(coords.lat, coords.lng),
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]?.photos?.length) {
          const url = results[0].photos![0].getUrl({ maxWidth });
          photoCache.set(cacheKey, url);
          resolve(url);
        } else {
          photoCache.set(cacheKey, null);
          resolve(null);
        }
      },
    );
  });
}

function buildInfoWindowNode(loc: Location, photoUrl?: string | null): HTMLDivElement {
  const regionBadge = loc.region === 'kyoto'
    ? '<span class="iw-badge iw-badge--kyoto">Kyoto</span>'
    : '<span class="iw-badge iw-badge--okinawa">Okinawa</span>';

  const typeBadge = `<span class="iw-type">${loc.type}</span>`;
  const rating = loc.rating ? `<span class="iw-rating">★ ${loc.rating}</span>` : '';
  const dayBadge = `<span class="iw-day">Day ${loc.day}</span>`;

  const showPlaceholder = photoUrl === undefined;
  const photoHTML = photoUrl
    ? `<img src="${photoUrl}" alt="${loc.name}" class="iw-photo" />`
    : showPlaceholder
      ? '<div class="iw-photo-placeholder"></div>'
      : '';

  const container = document.createElement('div');
  container.className = 'info-window';
  container.innerHTML = `
    ${photoHTML}
    <h3 class="iw-name">${loc.name}</h3>
    ${loc.nameJp ? `<span class="iw-name-jp">${loc.nameJp}</span>` : ''}
    <div class="iw-meta">
      ${typeBadge} ${rating} ${dayBadge} ${regionBadge}
    </div>
    <p class="iw-desc">${loc.description}</p>
    <button class="iw-more-btn" data-location-id="${loc.id}">More info</button>
  `;

  // Event delegation — handles button clicks even after DOM updates
  container.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.iw-more-btn') as HTMLElement | null;
    if (btn?.dataset.locationId) {
      const clickedLoc = locations.find((l) => l.id === btn.dataset.locationId);
      if (clickedLoc) fetchPlaceDetails(clickedLoc);
    }
  });

  return container;
}

function openInfoWindow(loc: Location, marker: google.maps.Marker): void {
  if (!infoWindow) return;
  const map = getMap();
  if (!map) return;

  const cached = photoCache.get(loc.id);

  infoWindow.setContent(buildInfoWindowNode(loc, cached !== undefined ? cached : undefined));
  infoWindow.open(map, marker);

  // Fetch photo if not cached
  if (cached === undefined) {
    fetchPlacePhoto(loc).then((url) => {
      photoCache.set(loc.id, url);
      if (infoWindow) {
        infoWindow.setContent(buildInfoWindowNode(loc, url));
      }
    });
  }
}

function highlightActivity(locationId: string): void {
  // Remove previous highlights
  document.querySelectorAll('.activity--highlighted').forEach((el) => {
    el.classList.remove('activity--highlighted');
  });

  const activityEl = document.querySelector(`[data-location-id="${locationId}"]`);
  if (activityEl) {
    activityEl.classList.add('activity--highlighted');
    activityEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// --- Animated travel line ---

function clearTravelLine(): void {
  if (travelLineTimeout) {
    clearTimeout(travelLineTimeout);
    travelLineTimeout = null;
  }
  if (activeTravelLine) {
    activeTravelLine.setMap(null);
    activeTravelLine = null;
  }
}

function drawTravelLine(
  map: google.maps.Map,
  from: google.maps.LatLngLiteral,
  to: google.maps.LatLngLiteral,
): void {
  clearTravelLine();

  activeTravelLine = new google.maps.Polyline({
    path: [from, to],
    geodesic: true,
    strokeColor: '#c85a4a',
    strokeOpacity: 0,
    strokeWeight: 2,
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          scale: 3,
        },
        offset: '0',
        repeat: '16px',
      },
    ],
    map,
  });

  // Auto-remove after 3 seconds
  travelLineTimeout = setTimeout(() => {
    if (activeTravelLine) {
      activeTravelLine.setMap(null);
      activeTravelLine = null;
    }
  }, 3000);
}

export async function panToLocation(locationId: string): Promise<void> {
  const map = getMap();
  const marker = markers.get(locationId);
  if (!map || !marker) return;

  const target = marker.getPosition()!;
  const targetLiteral = { lat: target.lat(), lng: target.lng() };

  // Draw travel line from previous location
  if (lastPosition) {
    drawTravelLine(map, lastPosition, targetLiteral);
  }

  lastPosition = targetLiteral;

  // Smooth fly-to animation — wait for it to fully complete
  await smoothFlyTo(map, targetLiteral, 16);

  // Open info window only after the map has settled on the target
  const loc = locations.find((l) => l.id === locationId);
  if (loc) {
    openInfoWindow(loc, marker);
  }
}

export function filterMarkersByDay(day: number): void {
  const map = getMap();
  if (!map) return;

  const bounds = new google.maps.LatLngBounds();
  let hasVisible = false;

  markers.forEach((marker, id) => {
    const loc = locations.find((l) => l.id === id);
    const visible = !loc || loc.day === day;
    marker.setVisible(visible);
    if (visible && loc) {
      bounds.extend({ lat: loc.lat, lng: loc.lng });
      hasVisible = true;
    }
  });

  // Re-render clusters after visibility change
  if (clusterer) {
    clusterer.render();
  }

  if (hasVisible) {
    map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
  }
}

export function showAllMarkers(): void {
  markers.forEach((marker) => marker.setVisible(true));
  if (clusterer) {
    clusterer.render();
  }
}

async function fetchPlaceDetails(loc: Location): Promise<void> {
  const panel = document.getElementById('place-detail-panel');
  if (!panel) return;

  panel.style.display = 'block';
  panel.innerHTML = '<div class="place-loading">Loading details...</div>';

  try {
    const place = await searchPlace(loc.name, { lat: loc.lat, lng: loc.lng });
    if (!place) throw new Error('Place not found');

    const photo = place.photos?.[0]?.getURI({ maxWidth: 400 });
    const hours = place.regularOpeningHours?.weekdayDescriptions?.join('<br>') || '';
    const review = place.reviews?.[0];
    const name = place.displayName ?? '';

    panel.innerHTML = `
      <button class="place-detail-close" aria-label="Close">&times;</button>
      ${photo ? `<img src="${photo}" alt="${name}" class="place-photo" />` : ''}
      <h3 class="place-name">${name}</h3>
      ${place.rating ? `<div class="place-rating">★ ${place.rating}</div>` : ''}
      ${place.formattedAddress ? `<p class="place-address">${place.formattedAddress}</p>` : ''}
      ${place.internationalPhoneNumber ? `<p class="place-phone">📞 ${place.internationalPhoneNumber}</p>` : ''}
      ${hours ? `<div class="place-hours"><strong>Hours:</strong><br>${hours}</div>` : ''}
      ${review ? `
        <div class="place-review">
          <p class="place-review-text">"${review.text?.toString().slice(0, 200)}${(review.text?.toString().length || 0) > 200 ? '...' : ''}"</p>
          <span class="place-review-author">— ${review.authorAttribution?.displayName ?? ''}</span>
        </div>
      ` : ''}
      <div class="place-links">
        ${place.websiteURI ? `<a href="${place.websiteURI}" target="_blank" rel="noopener" class="place-link">Website</a>` : ''}
        ${place.googleMapsURI ? `<a href="${place.googleMapsURI}" target="_blank" rel="noopener" class="place-link">Google Maps</a>` : ''}
      </div>
    `;

    panel.querySelector('.place-detail-close')?.addEventListener('click', () => {
      panel.style.display = 'none';
    });
  } catch (e) {
    console.warn('[places] fetchPlaceDetails failed:', e);
    panel.innerHTML = '<p class="place-error">Could not load place details.</p>';
  }
}

export function searchNearby(query: string): void {
  const map = getMap();
  const service = getPlacesService();
  if (!map || !service) return;

  // Clear previous search markers
  searchMarkers.forEach((m) => m.setMap(null));
  searchMarkers = [];

  const center = map.getCenter();
  if (!center) return;

  service.textSearch(
    {
      query: `vegan ${query}`,
      location: center,
      radius: 3000,
    },
    (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) return;

      results.slice(0, 10).forEach((place) => {
        if (!place.geometry?.location) return;

        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map,
          title: place.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#e07c5a',
            fillOpacity: 0.8,
            strokeColor: '#fff',
            strokeWeight: 2,
            scale: 10,
          },
        });

        marker.addListener('click', () => {
          if (!infoWindow) return;
          infoWindow.setContent(`
            <div class="info-window">
              <h3 class="iw-name">${place.name}</h3>
              <p class="iw-desc">${place.formatted_address || ''}</p>
              ${place.rating ? `<span class="iw-rating">★ ${place.rating}</span>` : ''}
              <span class="iw-type iw-type--search">Search result</span>
            </div>
          `);
          infoWindow.open(map, marker);
        });

        searchMarkers.push(marker);
      });
    }
  );
}
