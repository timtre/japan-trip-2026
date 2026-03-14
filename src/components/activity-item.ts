import type { Activity } from '../data/trip-data';

export function renderActivityItem(
  activity: Activity,
  onActivityClick: (locationId: string) => void
): HTMLElement {
  const el = document.createElement('div');
  el.className = `activity${activity.isAlternative ? ' activity--alternative' : ''}`;
  el.dataset.locationId = activity.locationId;

  if (activity.isAlternative) {
    el.innerHTML = `
      <span class="activity__or-label">OR</span>
      <div class="activity__content">
        <h4 class="activity__name">
          ${activity.title}
          <span class="activity__map-link" aria-label="Show on map">📍</span>
        </h4>
        <p class="activity__description">${activity.description}</p>
      </div>
    `;
  } else {
    el.innerHTML = `
      <div class="activity__time">${activity.time}</div>
      <div class="activity__content">
        <h4 class="activity__name">
          ${activity.title}
          <span class="activity__map-link" aria-label="Show on map">📍</span>
        </h4>
        <p class="activity__description">${activity.description}</p>
        ${activity.tip ? `
          <div class="tip-callout">
            <span class="tip-callout__icon">💡</span>
            <span class="tip-callout__text">${activity.tip}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  el.querySelector('.activity__content')?.addEventListener('click', () => {
    onActivityClick(activity.locationId);
  });

  return el;
}
