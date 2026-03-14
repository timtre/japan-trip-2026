import { tripDays } from '../data/trip-data';

export function renderNavigation(container: HTMLElement): void {
  container.classList.add('nav');

  const dayPills = tripDays
    .map(
      (day) => `
    <button class="day-pill day-pill--${day.region}" data-day="${day.day}" aria-label="Day ${day.day}">
      <span class="day-pill__emoji">${day.emoji}</span>
      <span class="day-pill__label">Day ${day.day}</span>
    </button>
  `
    )
    .join('');

  container.innerHTML = `
    <div class="nav__inner">
      <span class="nav__brand"><span class="nav__brand-icon">⛩</span>Japan 2026</span>
      <div class="nav__pills" id="nav-pills">
        ${dayPills}
      </div>
      <div class="nav__links">
        <a href="#preparation-section" class="nav__link" data-section="preparation">Preparation</a>
        <a href="#itinerary-section" class="nav__link" data-section="itinerary">Itinerary</a>
        <a href="#restaurants-section" class="nav__link" data-section="restaurants">Restaurants</a>
        <a href="#practical-section" class="nav__link" data-section="practical">Practical</a>
      </div>
    </div>
  `;

  // Sticky behavior
  const hero = document.getElementById('hero');
  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        container.classList.toggle('is-visible', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  // Day pill clicks
  container.querySelectorAll('.day-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const day = (pill as HTMLElement).dataset.day;
      const target = document.getElementById(`day-${day}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setActiveDay(Number(day));
    });
  });

  // Section link clicks
  container.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (link as HTMLAnchorElement).getAttribute('href');
      if (href) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

export function setActiveDay(day: number): void {
  document.querySelectorAll('.day-pill').forEach((pill) => {
    pill.classList.toggle('is-active', (pill as HTMLElement).dataset.day === String(day));
  });
}

export function setActiveSection(section: string): void {
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.classList.toggle('is-active', (link as HTMLElement).dataset.section === section);
  });
}
