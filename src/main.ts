import './styles/main.css';

// Show PDF link only in dev mode
if (import.meta.env.DEV) {
  const pdfLink = document.getElementById('pdf-link');
  if (pdfLink) pdfLink.style.display = '';
}

import { renderHero } from './components/hero';
import { renderNavigation, setActiveDay, setActiveSection } from './components/navigation';
import { renderDayTimeline } from './components/day-timeline';
import { renderRestaurantGuide, enableRestaurantPhotos } from './components/restaurant-guide';
import { renderPracticalSection } from './components/practical-section';
import { renderChecklist } from './components/checklist';
import { checklistItems } from './data/practical-info';
import { initCollapsibleSections } from './components/collapsible-sections';
import { initActiveNavTracking } from './utils/scroll';
import { initMap } from './map/map-init';
import { createMarkers, panToLocation, filterMarkersByDay } from './map/map-markers';
import { initMapFilters } from './map/map-filters';
import { locations } from './data/locations';

// ─── Render sections ──────────────────────────────────────────────────────
renderHero(document.getElementById('hero')!);
renderNavigation(document.getElementById('sticky-nav')!);

function handleLocationClick(locationId: string): void {
  const loc = locations.find(l => l.id === locationId);
  if (loc) filterMarkersByDay(loc.day);

  panToLocation(locationId);

  // On mobile, ensure map sidebar is expanded
  const mapSidebar = document.getElementById('map-sidebar');
  if (mapSidebar && window.innerWidth < 1024) {
    mapSidebar.classList.add('is-expanded');
    const textEl = document.querySelector('#map-toggle .map-toggle-text');
    if (textEl) textEl.textContent = 'Hide Map';
  }
}

renderDayTimeline(document.getElementById('day-timeline')!, handleLocationClick);
renderRestaurantGuide(
  document.getElementById('restaurant-filters')!,
  document.getElementById('restaurant-grid')!,
  handleLocationClick
);
renderChecklist(document.getElementById('preparation-content')!, checklistItems);
renderPracticalSection(document.getElementById('practical-content')!);
initCollapsibleSections();

// ─── Map close button (mobile) ───────────────────────────────────────────
const mapClose = document.getElementById('map-close');
const mapSidebarEl = document.getElementById('map-sidebar');
if (mapClose && mapSidebarEl) {
  mapClose.addEventListener('click', () => {
    mapSidebarEl.classList.remove('is-expanded');
  });
}


// ─── Google Maps ──────────────────────────────────────────────────────────
const restaurantGrid = document.getElementById('restaurant-grid')!;
initMap('map').then((map) => {
  if (map) {
    createMarkers();
    initMapFilters();
    enableRestaurantPhotos(restaurantGrid);
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
            filterMarkersByDay(dayNum);
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

  // On mobile, hide map sidebar + toggle when not viewing map-relevant sections
  if (window.innerWidth < 1024) {
    const mapSections = new Set(['itinerary-section', 'restaurants-section']);
    const visibleMapSections = new Set<string>();
    const sidebar = document.getElementById('map-sidebar');
    const toggle = document.getElementById('map-toggle');

    const mapVisibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleMapSections.add(id);
          } else {
            visibleMapSections.delete(id);
          }
        });

        const shouldShow = visibleMapSections.size > 0;
        if (sidebar) sidebar.style.display = shouldShow ? '' : 'none';
        if (toggle) toggle.style.display = shouldShow ? '' : 'none';

        // Collapse sidebar when hiding
        if (!shouldShow && sidebar) {
          sidebar.classList.remove('is-expanded');
          const textEl = toggle?.querySelector('.map-toggle-text');
          if (textEl) textEl.textContent = 'Show Map';
        }
      },
      { threshold: 0 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      if (mapSections.has(section.id)) {
        mapVisibilityObserver.observe(section);
      }
    });
  }
});

// ─── Nav pill → map filter sync ───────────────────────────────────────────
document.getElementById('sticky-nav')?.addEventListener('click', (e) => {
  const pill = (e.target as HTMLElement).closest('.day-pill');
  if (pill) {
    const day = Number((pill as HTMLElement).dataset.day);
    if (day) filterMarkersByDay(day);
  }
});
