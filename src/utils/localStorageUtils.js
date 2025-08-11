// src/utils/localStorageUtils.js
const EVENTS_KEY = "calendar-events";
const THEME_KEY = "calendar-theme";

export const loadEvents = () => {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load events from localStorage", e);
    return [];
  }
};

export const saveEvents = (events) => {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (e) {
    console.error("Failed to save events to localStorage", e);
  }
};

export const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error("Failed to save theme to localStorage", e);
  }
};
