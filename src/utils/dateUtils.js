// src/utils/dateUtils.js

// Format date as YYYY-MM-DD
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Format time as HH:MM AM/PM
export const formatTime = (time) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get full month name
export const getMonthName = (month) => {
  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  return months[month];
};

// Total number of days in a given month
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Day index (0=Sunday, 1=Monday, etc.) of first day of month
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};
