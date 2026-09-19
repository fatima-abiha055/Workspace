// Converts "HH:MM" strings into a decimal hour duration.
export function getDurationHours(startTime, endTime) {
  if (!startTime || !endTime) return 0;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  if ([sh, sm, eh, em].some((n) => Number.isNaN(n))) return 0;
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;
  const diff = (endMinutes - startMinutes) / 60;
  return diff > 0 ? Math.round(diff * 100) / 100 : 0;
}

// Total price = hourly rate x duration, always calculated dynamically (never hard-coded).
export function calculatePrice(hourlyRate, durationHours) {
  const total = Number(hourlyRate) * Number(durationHours);
  return Math.round(total * 100) / 100;
}

export function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}
