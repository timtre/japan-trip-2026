import './styles/main.css';

// Show PDF link only in dev mode
if (import.meta.env.DEV) {
  const pdfLink = document.getElementById('pdf-link');
  if (pdfLink) pdfLink.style.display = '';
}

import { renderHero } from './components/hero';
import { renderNavigation, setActiveDay, setActiveSection } from './components/navigation';
import { renderDayTimeline } from './components/day-timeline';
import { renderRestaurantGuide } from './components/restaurant-guide';
import { renderPracticalSection } from './components/practical-section';
import { initActiveNavTracking } from './utils/scroll';
import { initMap } from './map/map-init';
import { createMarkers, panToLocation, searchNearby, filterMarkersByDay } from './map/map-markers';
import { initMapFilters } from './map/map-filters';

// ─── Render sections ──────────────────────────────────────────────────────
renderHero(document.getElementById('hero')!);
renderNavigation(document.getElementById('sticky-nav')!);

function handleLocationClick(locationId: string): void {
  panToLocation(locationId);

  // On mobile, ensure map sidebar is expanded
  const mapSidebar = document.getElementById('map-sidebar');
  if (mapSidebar && window.innerWidth < 1024) {
    mapSidebar.classList.add('is-expanded');
  }
}

renderDayTimeline(document.getElementById('day-timeline')!, handleLocationClick);
renderRestaurantGuide(
  document.getElementById('restaurant-filters')!,
  document.getElementById('restaurant-grid')!,
  handleLocationClick
);
renderPracticalSection(document.getElementById('practical-content')!);

// ─── Map toggle (mobile) ──────────────────────────────────────────────────
const mapToggle = document.getElementById('map-toggle');
const mapSidebarEl = document.getElementById('map-sidebar');
if (mapToggle && mapSidebarEl) {
  mapToggle.addEventListener('click', () => {
    const isVisible = mapSidebarEl.classList.toggle('is-expanded');
    const textEl = mapToggle.querySelector('.map-toggle-text');
    if (textEl) textEl.textContent = isVisible ? 'Hide Map' : 'Show Map';
  });
}

// ─── Map search ───────────────────────────────────────────────────────────
const mapSearch = document.getElementById('map-search') as HTMLInputElement | null;
if (mapSearch) {
  let searchTimeout: ReturnType<typeof setTimeout>;
  mapSearch.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = mapSearch.value.trim();
      if (query.length >= 2) searchNearby(query);
    }, 500);
  });
}

// ─── Google Maps ──────────────────────────────────────────────────────────
initMap('map').then((map) => {
  if (map) {
    createMarkers();
    initMapFilters();
  }
});

// ─── Scroll-driven animations ─────────────────────────────────────────────
requestAnimationFrame(() => {
  // Reveal day cards and restaurant cards on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.day-card, .restaurant-card, .reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // Track active day card for nav pills and map
  const dayObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const dayNum = Number((entry.target as HTMLElement).id.replace('day-', ''));
          if (dayNum) {
            setActiveDay(dayNum);
          }
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  document.querySelectorAll('.day-card').forEach((card) => {
    dayObserver.observe(card);
  });

  // Track section visibility for nav links
  initActiveNavTracking((sectionId) => setActiveSection(sectionId));
});

// ─── Nav pill → map filter sync ───────────────────────────────────────────
document.getElementById('sticky-nav')?.addEventListener('click', (e) => {
  const pill = (e.target as HTMLElement).closest('.day-pill');
  if (pill) {
    const day = Number((pill as HTMLElement).dataset.day);
    if (day) filterMarkersByDay(day);
  }
});
