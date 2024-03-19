export const formatDate = (date: Date) => {
  return date.toLocaleDateString([], {
    weekday: 'long', // Full day name (e.g., Tuesday)
    day: 'numeric', // Day of the month (e.g., 19)
    month: 'long', // Full month name (e.g., March)
  });
};
