export function formatPercent(value) {
  return `${(value * 100).toFixed(0)}%`;
}

export function formatDate(value) {
  return new Date(value).toLocaleString();
}
