// All persistence for this frontend-only app lives in localStorage.
const KEYS = {
  BOOKINGS: "ws_bookings",
  FAVORITES: "ws_favorites",
  USER: "ws_user",
  LOGGED_IN: "ws_logged_in",
};

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function generateId(prefix = "BK") {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${Date.now().toString().slice(-6)}${rand}`;
}

/* ---------------- Bookings ---------------- */

export function getBookings() {
  return safeParse(localStorage.getItem(KEYS.BOOKINGS), []);
}

export function saveBooking(booking) {
  const bookings = getBookings();
  const newBooking = {
    id: generateId("BK"),
    status: "Upcoming",
    createdAt: new Date().toISOString(),
    ...booking,
  };
  bookings.unshift(newBooking);
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  return newBooking;
}

export function cancelBooking(id) {
  const bookings = getBookings().map((b) =>
    b.id === id ? { ...b, status: "Cancelled" } : b
  );
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  return bookings;
}

// Two time ranges (HH:MM) on the same date overlap if start < otherEnd && end > otherStart.
function timesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

// Checks existing "Upcoming" bookings in localStorage for a clash on the same
// workspace, date and overlapping time range.
export function checkAvailability(workspaceId, date, startTime, endTime, excludeBookingId = null) {
  const bookings = getBookings();
  const conflict = bookings.find(
    (b) =>
      b.workspaceId === workspaceId &&
      b.date === date &&
      b.status === "Upcoming" &&
      b.id !== excludeBookingId &&
      timesOverlap(startTime, endTime, b.startTime, b.endTime)
  );
  return { available: !conflict, conflict };
}

/* ---------------- Favorites ---------------- */

export function getFavorites() {
  return safeParse(localStorage.getItem(KEYS.FAVORITES), []);
}

export function isFavorite(workspaceId) {
  return getFavorites().includes(workspaceId);
}

export function saveFavorite(workspaceId) {
  const favorites = getFavorites();
  if (!favorites.includes(workspaceId)) {
    favorites.push(workspaceId);
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  }
  return favorites;
}

export function removeFavorite(workspaceId) {
  const favorites = getFavorites().filter((id) => id !== workspaceId);
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  return favorites;
}

export function toggleFavorite(workspaceId) {
  return isFavorite(workspaceId) ? removeFavorite(workspaceId) : saveFavorite(workspaceId);
}

/* ---------------- Auth / Profile ---------------- */

export function getUser() {
  return safeParse(localStorage.getItem(KEYS.USER), null);
}

export function saveUser(user) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
  localStorage.setItem(KEYS.LOGGED_IN, "true");
  return user;
}

export function updateUser(partial) {
  const current = getUser() || {};
  const updated = { ...current, ...partial };
  localStorage.setItem(KEYS.USER, JSON.stringify(updated));
  return updated;
}

export function isLoggedIn() {
  return localStorage.getItem(KEYS.LOGGED_IN) === "true" && !!getUser();
}

export function logout() {
  localStorage.setItem(KEYS.LOGGED_IN, "false");
}
