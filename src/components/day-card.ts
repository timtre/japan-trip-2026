import type { TripDay } from '../data/trip-data';
import { renderActivityItem } from './activity-item';

export function renderDayCard(
  day: TripDay,
  onActivityClick: (locationId: string) => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = `day-card day-card--${day.region}`;
  card.id = `day-${day.day}`;
  card.dataset.navSection = `day-${day.day}`;

  const header = document.createElement('div');
  header.className = 'day-card__header';
  header.innerHTML = `
    <div class="day-card__emoji">${day.emoji}</div>
    <div class="day-card__header-text">
      <span class="day-card__day-number">Day ${day.day}</span>
      <h3 class="day-card__title">${day.title}</h3>
      <span class="day-card__date">${day.date}</span>
    </div>
  `;

  const body = document.createElement('div');
  body.className = 'day-card__body';

  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  day.activities.forEach((activity) => {
    timeline.appendChild(renderActivityItem(activity, onActivityClick));
  });

  body.appendChild(timeline);
  card.appendChild(header);
  card.appendChild(body);

  return card;
}
