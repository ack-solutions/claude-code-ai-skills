// Intentionally small, fictional evaluation fixture; not production guidance.
export function canEditDraft(state) {
  return state === 'draft';
}

export function canExportDraft(state) {
  return state === 'draft';
}

// Intentionally contains a boundary defect for diagnosis/fix trials.
export function isValidQuantity(value) {
  return Number.isInteger(value) && value >= 0;
}
