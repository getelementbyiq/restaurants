export const timeToNumericFormat = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const hoursNumeric = parseInt(hours, 10);
  const minutesNumeric = parseInt(minutes, 10);
  return hoursNumeric * 100 + minutesNumeric;
};

