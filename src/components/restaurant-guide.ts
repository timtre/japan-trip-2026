import { restaurants } from '../data/restaurants';
import { renderRestaurantCard } from './restaurant-card';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'shojin', label: 'Shojin Ryori' },
  { key: 'modern-vegan', label: 'Modern Vegan' },
  { key: 'ramen', label: 'Ramen' },
  { key: 'sushi', label: 'Sushi' },
  { key: 'cafe', label: 'Cafés' },
  { key: 'okinawa', label: 'Okinawa' },
];

export function renderRestaurantGuide(
  filtersContainer: HTMLElement,
  gridContainer: HTMLElement,
  onCardClick: (locationId: string) => void
): void {
  filtersContainer.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-tab${cat.key === 'all' ? ' is-active' : ''}" data-category="${cat.key}">
      ${cat.label}
    </button>
  `
    )
    .join('');

  function renderCards(category: string) {
    gridContainer.innerHTML = '';
    const filtered =
      category === 'all'
        ? restaurants
        : restaurants.filter((r) => r.category === category);

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="restaurant-empty">
          <div class="restaurant-empty__icon">🍃</div>
          <p class="restaurant-empty__text">No restaurants in this category yet.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((restaurant) => {
      gridContainer.appendChild(renderRestaurantCard(restaurant, onCardClick));
    });

    // Trigger scroll reveal for new cards
    requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      gridContainer.querySelectorAll('.restaurant-card').forEach((card) => {
        observer.observe(card);
      });
    });
  }

  renderCards('all');

  filtersContainer.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      filtersContainer
        .querySelectorAll('.filter-tab')
        .forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      renderCards((tab as HTMLElement).dataset.category || 'all');
    });
  });
}
