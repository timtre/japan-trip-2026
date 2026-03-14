import { locations, type Location } from '../data/locations';
import { getMap, getPlacesService } from './map-init';

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
let infoWindow: google.maps.InfoWindow | null = null;
let searchMarkers: google.maps.Marker[] = [];

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

export function createMarkers(): void {
  const map = getMap();
  if (!map) return;

  infoWindow = new google.maps.InfoWindow();

  locations.forEach((loc) => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.name,
      icon: createMarkerIcon(loc.type),
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', () => {
      openInfoWindow(loc, marker);
      highlightActivity(loc.id);
    });

    markers.set(loc.id, marker);
  });
}

function openInfoWindow(loc: Location, marker: google.maps.Marker): void {
  if (!infoWindow) return;
  const map = getMap();
  if (!map) return;

  const regionBadge = loc.region === 'kyoto'
    ? '<span class="iw-badge iw-badge--kyoto">Kyoto</span>'
    : '<span class="iw-badge iw-badge--okinawa">Okinawa</span>';

  const typeBadge = `<span class="iw-type">${loc.type}</span>`;
  const rating = loc.rating ? `<span class="iw-rating">★ ${loc.rating}</span>` : '';
  const dayBadge = `<span class="iw-day">Day ${loc.day}</span>`;

  infoWindow.setContent(`
    <div class="info-window">
      <h3 class="iw-name">${loc.name}</h3>
      ${loc.nameJp ? `<span class="iw-name-jp">${loc.nameJp}</span>` : ''}
      <div class="iw-meta">
        ${typeBadge} ${rating} ${dayBadge} ${regionBadge}
      </div>
      <p class="iw-desc">${loc.description}</p>
      ${loc.placeId ? `<button class="iw-more-btn" data-place-id="${loc.placeId}" data-location-id="${loc.id}">More info</button>` : ''}
    </div>
  `);

  infoWindow.open(map, marker);

  // Bind "More info" button after content is set
  google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
    const btn = document.querySelector('.iw-more-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const placeId = (btn as HTMLElement).dataset.placeId!;
        fetchPlaceDetails(placeId);
      });
    }
  });
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

export function panToLocation(locationId: string): void {
  const map = getMap();
  const marker = markers.get(locationId);
  if (!map || !marker) return;

  map.panTo(marker.getPosition()!);
  map.setZoom(16);

  const loc = locations.find((l) => l.id === locationId);
  if (loc) openInfoWindow(loc, marker);
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

  if (hasVisible) {
    map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
  }
}

export function showAllMarkers(): void {
  markers.forEach((marker) => marker.setVisible(true));
}

function fetchPlaceDetails(placeId: string): void {
  const service = getPlacesService();
  if (!service) return;

  const panel = document.getElementById('place-detail-panel');
  if (!panel) return;

  panel.style.display = 'block';
  panel.innerHTML = '<div class="place-loading">Loading details...</div>';

  service.getDetails(
    {
      placeId,
      fields: [
        'name',
        'formatted_address',
        'formatted_phone_number',
        'opening_hours',
        'rating',
        'reviews',
        'photos',
        'website',
        'url',
      ],
    },
    (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
        panel.innerHTML = '<p class="place-error">Could not load place details.</p>';
        return;
      }

      const photo = place.photos?.[0]?.getUrl({ maxWidth: 400, maxHeight: 200 });
      const hours = place.opening_hours?.weekday_text?.join('<br>') || '';
      const review = place.reviews?.[0];

      panel.innerHTML = `
        <button class="place-detail-close" aria-label="Close">&times;</button>
        ${photo ? `<img src="${photo}" alt="${place.name}" class="place-photo" />` : ''}
        <h3 class="place-name">${place.name}</h3>
        ${place.rating ? `<div class="place-rating">★ ${place.rating}</div>` : ''}
        ${place.formatted_address ? `<p class="place-address">${place.formatted_address}</p>` : ''}
        ${place.formatted_phone_number ? `<p class="place-phone">📞 ${place.formatted_phone_number}</p>` : ''}
        ${hours ? `<div class="place-hours"><strong>Hours:</strong><br>${hours}</div>` : ''}
        ${review ? `
          <div class="place-review">
            <p class="place-review-text">"${review.text?.slice(0, 200)}${(review.text?.length || 0) > 200 ? '...' : ''}"</p>
            <span class="place-review-author">— ${review.author_name}</span>
          </div>
        ` : ''}
        <div class="place-links">
          ${place.website ? `<a href="${place.website}" target="_blank" rel="noopener" class="place-link">Website</a>` : ''}
          ${place.url ? `<a href="${place.url}" target="_blank" rel="noopener" class="place-link">Google Maps</a>` : ''}
        </div>
      `;

      panel.querySelector('.place-detail-close')?.addEventListener('click', () => {
        panel.style.display = 'none';
      });
    }
  );
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
