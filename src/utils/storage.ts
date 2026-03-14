const PREFIX = 'japan-trip-2026';

export function getCheckedItems(): Set<string> {
  try {
    const raw = localStorage.getItem(`${PREFIX}:checklist`);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function setCheckedItems(items: Set<string>): void {
  localStorage.setItem(`${PREFIX}:checklist`, JSON.stringify([...items]));
}

export function toggleCheckItem(id: string): Set<string> {
  const items = getCheckedItems();
  if (items.has(id)) {
    items.delete(id);
  } else {
    items.add(id);
  }
  setCheckedItems(items);
  return items;
}

export function getCollapsedSections(): Set<string> {
  try {
    const raw = localStorage.getItem(`${PREFIX}:collapsed-sections`);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function setCollapsedSections(sections: Set<string>): void {
  localStorage.setItem(`${PREFIX}:collapsed-sections`, JSON.stringify([...sections]));
}

export function toggleSectionCollapsed(id: string): Set<string> {
  const sections = getCollapsedSections();
  if (sections.has(id)) {
    sections.delete(id);
  } else {
    sections.add(id);
  }
  setCollapsedSections(sections);
  return sections;
}
