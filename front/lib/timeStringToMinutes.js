/**
 * Takes in a time string in HH:MM format and returns the total
 * amount of minutes
 *
 * @param {String} str Time string (HH:MM)
 *
 * @returns {Number} Total minutes
 */
const timeStringToMinutes = (str) => {
  if (!/^[0-2][0-9]:[0-5][0-9]$/.test(str)) return 0;

  const [hours, minutes] = str.split(":").map((val) => parseInt(val));

  return hours * 60 + minutes;
};

export default timeStringToMinutes;
