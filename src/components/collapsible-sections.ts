import { getCollapsedSections, toggleSectionCollapsed } from '../utils/storage';

export function initCollapsibleSections(): void {
  const collapsed = getCollapsedSections();

  document.querySelectorAll<HTMLElement>('[data-nav-section]').forEach((section) => {
    const id = section.dataset.navSection!;
    const toggle = section.querySelector('.section__collapse-toggle');
    if (!toggle) return;

    if (collapsed.has(id)) {
      section.classList.add('is-collapsed');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', () => {
      const nowCollapsed = toggleSectionCollapsed(id);
      const isCollapsed = nowCollapsed.has(id);
      section.classList.toggle('is-collapsed', isCollapsed);
      toggle.setAttribute('aria-expanded', String(!isCollapsed));
    });
  });
}
