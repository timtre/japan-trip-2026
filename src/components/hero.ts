export function renderHero(container: HTMLElement): void {
  container.classList.add('hero');
  const tripDate = new Date('2026-04-20T00:00:00');

  function getCountdown(): { days: number; hours: number; minutes: number } {
    const now = new Date();
    const diff = tripDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
    };
  }

  function renderCountdown(): string {
    const { days, hours, minutes } = getCountdown();
    if (days === 0 && hours === 0 && minutes === 0) {
      return '<div class="countdown__unit"><span class="countdown__number">Go!</span><span class="countdown__label">The adventure begins</span></div>';
    }
    return `
      <div class="countdown__unit">
        <span class="countdown__number">${days}</span>
        <span class="countdown__label">days</span>
      </div>
      <span class="countdown__separator">:</span>
      <div class="countdown__unit">
        <span class="countdown__number">${hours}</span>
        <span class="countdown__label">hours</span>
      </div>
      <span class="countdown__separator">:</span>
      <div class="countdown__unit">
        <span class="countdown__number">${minutes}</span>
        <span class="countdown__label">min</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="hero__blossoms">
      <div class="hero__blossom"></div>
      <div class="hero__blossom"></div>
      <div class="hero__blossom"></div>
      <div class="hero__blossom"></div>
      <div class="hero__blossom"></div>
      <div class="hero__blossom"></div>
    </div>
    <div class="hero__torii">
      <div class="hero__torii-pillars"></div>
    </div>
    <div class="hero__content">
      <p class="hero__pretitle">April 20 – 27, 2026</p>
      <h1 class="hero__title">
        JAPAN 2026
        <span class="hero__title-jp">京都 & 沖縄</span>
      </h1>
      <p class="hero__subtitle">
        Kyoto & Okinawa — 8 days of temples, onsen, beaches & 100% vegan food
      </p>
      <div class="hero__countdown" id="hero-countdown">
        ${renderCountdown()}
      </div>
      <a href="#itinerary-section" class="hero__cta">
        Explore the itinerary ↓
      </a>
    </div>
    <div class="hero__scroll-indicator">
      <span>Scroll</span>
    </div>
    <div class="hero__wave--css"></div>
  `;

  // CTA smooth scroll
  container.querySelector('.hero__cta')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('itinerary-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Update countdown every minute
  const countdownEl = document.getElementById('hero-countdown');
  setInterval(() => {
    if (countdownEl) countdownEl.innerHTML = renderCountdown();
  }, 60000);
}
