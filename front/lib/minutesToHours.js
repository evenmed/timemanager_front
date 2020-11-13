/**
 * Converts a whole amount of minutes to hours, rounded to 1 decimal
 * @param {Int} mins Amount of minutes
 *
 * @return {Number} Amount of hours, rounded to 1 decimal
 */
export default function minutesToHours(mins) {
  return Math.round(parseInt(mins) / 6) / 10;
}
