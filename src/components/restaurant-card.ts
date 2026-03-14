import type { Restaurant } from '../data/restaurants';

const categoryLabels: Record<string, string> = {
  shojin: 'Shojin Ryori',
  'modern-vegan': 'Modern Vegan',
  ramen: 'Ramen',
  sushi: 'Sushi',
  cafe: 'Caf\u00e9',
  okinawa: 'Okinawa',
};

export function renderRestaurantCard(
  restaurant: Restaurant,
  onCardClick: (locationId: string) => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = `restaurant-card restaurant-card--${restaurant.region}`;
  card.dataset.category = restaurant.category;
  card.dataset.locationId = restaurant.locationId;

  card.innerHTML = `
    <div class="restaurant-card__photo" data-photo-for="${restaurant.locationId}">
      <div class="restaurant-card__photo-placeholder"></div>
    </div>
    <div class="restaurant-card__content">
      <div class="restaurant-card__header">
        <div>
          <h3 class="restaurant-card__name">${restaurant.name}</h3>
          ${restaurant.nameJp ? `<span class="restaurant-card__name-jp">${restaurant.nameJp}</span>` : ''}
        </div>
        <div class="restaurant-card__badges">
          ${restaurant.mustBook ? '<span class="restaurant-card__must-book">Must Book</span>' : ''}
          <span class="restaurant-card__category restaurant-card__category--${restaurant.category}">
            ${categoryLabels[restaurant.category] || restaurant.category}
          </span>
        </div>
      </div>
      <div class="restaurant-card__rating">
        <span class="rating-stars">
          ${'\u2605'.repeat(Math.floor(restaurant.rating))}${restaurant.rating % 1 >= 0.3 ? '\u00BD' : ''}
        </span>
        <span class="rating-value">${restaurant.rating}</span>
      </div>
      <p class="restaurant-card__description">${restaurant.description}</p>
      <div class="restaurant-card__footer">
        <div class="restaurant-card__hours">
          <span class="restaurant-card__hours-icon">\uD83D\uDD50</span>
          <span>${restaurant.hours}</span>
          ${restaurant.closedDays.length ? `<span> \u00b7 Closed: ${restaurant.closedDays.join(', ')}</span>` : ''}
        </div>
        ${restaurant.url ? `<a href="${restaurant.url}" target="_blank" rel="noopener" class="restaurant-card__link" onclick="event.stopPropagation()">Visit &rarr;</a>` : ''}
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    if (restaurant.url) {
      window.open(restaurant.url, '_blank', 'noopener');
    } else {
      onCardClick(restaurant.locationId);
    }
  });

  return card;
}
