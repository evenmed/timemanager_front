/**
 * Converts a whole amount of minutes to hours, rounded to 1 decimal
 * @param {Number} mins Amount of minutes (must be an integer)
 *
 * @return {Number} Amount of hours, rounded to 1 decimal
 */
export default function minutesToHours(mins) {
  if (`${parseInt(mins)}` !== `${mins}` || mins <= 0) return 0;

  return Math.round(parseInt(mins) / 6) / 10;
}
