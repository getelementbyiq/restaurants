export const getTodayWeekday = () => {
    const daysOfWeek = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ];
    const today = new Date();
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];
  };