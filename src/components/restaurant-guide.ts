import { restaurants } from '../data/restaurants';
import { locations } from '../data/locations';
import { renderRestaurantCard } from './restaurant-card';
import { fetchPlacePhotoUrl } from '../map/map-markers';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'shojin', label: 'Shojin Ryori' },
  { key: 'modern-vegan', label: 'Modern Vegan' },
  { key: 'ramen', label: 'Ramen' },
  { key: 'sushi', label: 'Sushi' },
  { key: 'cafe', label: 'Caf\u00e9s' },
  { key: 'okinawa', label: 'Okinawa' },
];

const locationMap = new Map(locations.map((l) => [l.id, l]));
let photosEnabled = false;

async function loadPhotosForCards(container: HTMLElement) {
  if (!photosEnabled) return;
  const photoEls = [...container.querySelectorAll<HTMLElement>('.restaurant-card__photo[data-photo-for]')];

  for (const photoEl of photoEls) {
    const locationId = photoEl.dataset.photoFor!;
    const loc = locationMap.get(locationId);
    if (!loc) continue;

    try {
      const url = await fetchPlacePhotoUrl(loc.name, { lat: loc.lat, lng: loc.lng });
      if (url && photoEl.isConnected) {
        photoEl.innerHTML = `<img src="${url}" alt="${loc.name}" loading="lazy" />`;
      } else if (photoEl.isConnected) {
        photoEl.remove();
      }
    } catch {
      // skip failed photo
    }
  }
}

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
          <div class="restaurant-empty__icon">\uD83C\uDF43</div>
          <p class="restaurant-empty__text">No restaurants in this category yet.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((restaurant) => {
      gridContainer.appendChild(renderRestaurantCard(restaurant, onCardClick));
    });

    loadPhotosForCards(gridContainer);

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

export function enableRestaurantPhotos(gridContainer: HTMLElement): void {
  photosEnabled = true;
  loadPhotosForCards(gridContainer);
}
