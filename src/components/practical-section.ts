import {
  transportInfo,
  budgetItems,
  insiderTips,
  veganTips,
  accommodationTips,
} from '../data/practical-info';

interface AccordionSection {
  id: string;
  title: string;
  icon: string;
  render: (container: HTMLElement) => void;
}

export function renderPracticalSection(container: HTMLElement): void {
  const sections: AccordionSection[] = [
    {
      id: 'transport',
      title: 'Transport',
      icon: '🚄',
      render: (el) => {
        el.innerHTML = `
          <div class="transport-cards">
            ${transportInfo
              .map(
                (t) => `
              <div class="transport-card">
                <h4 class="transport-card__title">${t.route}</h4>
                <p class="transport-card__description">${t.details}</p>
                <div class="transport-card__detail">
                  <span class="transport-card__detail-label">Cost</span>
                  <span>${t.cost} (${t.costEur})</span>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `;
      },
    },
    {
      id: 'budget',
      title: 'Budget',
      icon: '💰',
      render: (el) => {
        const grouped = budgetItems.reduce(
          (acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
          },
          {} as Record<string, typeof budgetItems>
        );

        el.innerHTML = `
          <table class="budget-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>JPY</th>
                <th>EUR</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(grouped)
                .map(
                  ([category, items]) => `
                <tr class="budget-category-row">
                  <td colspan="3"><strong>${category}</strong></td>
                </tr>
                ${items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.item}</td>
                    <td class="budget-table__amount">${item.costJpy}</td>
                    <td class="budget-table__amount">${item.costEur}</td>
                  </tr>
                `
                  )
                  .join('')}
              `
                )
                .join('')}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total per person</strong></td>
                <td><strong>~¥130,000–220,000</strong></td>
                <td><strong>~€700–1,200</strong></td>
              </tr>
            </tfoot>
          </table>
        `;
      },
    },
    {
      id: 'insider-tips',
      title: 'Insider Tips — Kyoto',
      icon: '🏯',
      render: (el) => {
        el.innerHTML = `
          <div class="tips-list">
            ${insiderTips.map((tip) => `
              <div class="tips-list__item">
                <span class="tips-list__bullet">🏯</span>
                <span class="tips-list__text">${tip}</span>
              </div>
            `).join('')}
          </div>
        `;
      },
    },
    {
      id: 'vegan-tips',
      title: 'Vegan Survival Tips',
      icon: '🌱',
      render: (el) => {
        el.innerHTML = `
          <div class="tips-list">
            ${veganTips.map((tip) => `
              <div class="tips-list__item">
                <span class="tips-list__bullet">🌱</span>
                <span class="tips-list__text">${tip}</span>
              </div>
            `).join('')}
          </div>
        `;
      },
    },
    {
      id: 'accommodation',
      title: 'Accommodation Tips',
      icon: '🏠',
      render: (el) => {
        el.innerHTML = `
          <div class="accommodation-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg);">
            <div>
              <h4 style="font-family: var(--font-display); margin-bottom: var(--space-md);">Kyoto</h4>
              <div class="tips-list">
                ${accommodationTips.kyoto.map((tip) => `
                  <div class="tips-list__item">
                    <span class="tips-list__bullet">🏠</span>
                    <span class="tips-list__text">${tip}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <h4 style="font-family: var(--font-display); margin-bottom: var(--space-md);">Okinawa</h4>
              <div class="tips-list">
                ${accommodationTips.okinawa.map((tip) => `
                  <div class="tips-list__item">
                    <span class="tips-list__bullet">🏖</span>
                    <span class="tips-list__text">${tip}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      },
    },
  ];

  container.innerHTML = `<div class="accordion">
    ${sections
      .map(
        (section) => `
    <div class="accordion__item" id="accordion-${section.id}">
      <button class="accordion__trigger" aria-expanded="false" aria-controls="accordion-body-${section.id}">
        <span class="accordion__trigger-icon">${section.icon}</span>
        <div class="accordion__trigger-text">
          <span class="accordion__trigger-title">${section.title}</span>
        </div>
        <svg class="accordion__chevron" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="accordion__panel" id="accordion-body-${section.id}" role="region">
        <div class="accordion__panel-inner">
          <div class="accordion__content" data-section="${section.id}"></div>
        </div>
      </div>
    </div>
  `
      )
      .join('')}
  </div>`;

  // Wire up accordion behavior
  container.querySelectorAll('.accordion__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item')!;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all
      container.querySelectorAll('.accordion__trigger').forEach((t) => {
        t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');

        // Lazy-render content on first open
        const contentEl = item.querySelector('.accordion__content') as HTMLElement;
        if (contentEl && !contentEl.dataset.rendered) {
          const sectionId = contentEl.dataset.section!;
          const section = sections.find((s) => s.id === sectionId);
          if (section) {
            section.render(contentEl);
            contentEl.dataset.rendered = 'true';
          }
        }
      }
    });
  });
}
