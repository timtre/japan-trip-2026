import { filterMarkersByDay, showAllMarkers } from './map-markers';
import { panToRegion } from './map-init';

let currentDay: number | null = null;

export function initMapFilters(): void {
  const regionJumpBtn = document.getElementById('region-jump');
  if (regionJumpBtn) {
    let currentRegion: 'kyoto' | 'okinawa' = 'kyoto';
    regionJumpBtn.addEventListener('click', () => {
      currentRegion = currentRegion === 'kyoto' ? 'okinawa' : 'kyoto';
      panToRegion(currentRegion);
      const target = currentRegion === 'kyoto' ? 'okinawa' : 'kyoto';
      regionJumpBtn.innerHTML = `<span class="map-region-toggle__icon">📍</span> ${target.charAt(0).toUpperCase() + target.slice(1)}`;
      regionJumpBtn.dataset.region = target;
    });
  }
}

export function setDayFilter(day: number | null): void {
  if (day === currentDay) {
    // Toggle off
    currentDay = null;
    showAllMarkers();
  } else {
    currentDay = day;
    if (day) filterMarkersByDay(day);
  }
}

export function getCurrentDayFilter(): number | null {
  return currentDay;
}
