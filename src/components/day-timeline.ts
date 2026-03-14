import { tripDays } from '../data/trip-data';
import { renderDayCard } from './day-card';

export function renderDayTimeline(
  container: HTMLElement,
  onActivityClick: (locationId: string) => void
): void {
  tripDays.forEach((day) => {
    container.appendChild(renderDayCard(day, onActivityClick));
  });
}
