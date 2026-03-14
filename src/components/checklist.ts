import type { ChecklistItem } from '../data/practical-info';
import { getCheckedItems, toggleCheckItem } from '../utils/storage';

export function renderChecklist(
  container: HTMLElement,
  items: ChecklistItem[]
): void {
  function render() {
    const currentChecked = getCheckedItems();
    const progress = (currentChecked.size / items.length) * 100;

    container.innerHTML = `
      <div class="progress">
        <div class="progress__header">
          <span class="progress__label">Booking progress</span>
          <span class="progress__value">${currentChecked.size}/${items.length}</span>
        </div>
        <div class="progress__bar">
          <div class="progress__fill" style="width: ${progress}%"></div>
        </div>
      </div>
      <div class="checklist">
        ${items
          .map(
            (item) => `
          <label class="checklist__item">
            <div class="checklist__checkbox">
              <input type="checkbox" data-id="${item.id}"
                ${currentChecked.has(item.id) ? 'checked' : ''} />
              <span class="checklist__checkbox-visual"></span>
            </div>
            <div>
              <span class="checklist__label">${item.text}</span>
              <span style="display: block; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">
                ${item.details} · ${item.timeframe}
                ${item.url ? `· <a href="${item.url}" target="_blank" rel="noopener" class="checklist__link" onclick="event.stopPropagation()">Book &rarr;</a>` : ''}
              </span>
            </div>
          </label>
        `
          )
          .join('')}
      </div>
    `;

    container.querySelectorAll('.checklist__checkbox input').forEach((cb) => {
      cb.addEventListener('change', () => {
        const id = (cb as HTMLElement).dataset.id!;
        toggleCheckItem(id);
        render();
      });
    });
  }

  render();
}
