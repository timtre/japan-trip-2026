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
      regionJumpBtn.textContent =
        currentRegion === 'kyoto' ? 'Jump to Okinawa →' : '← Jump to Kyoto';
      regionJumpBtn.dataset.region = currentRegion === 'kyoto' ? 'okinawa' : 'kyoto';
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
