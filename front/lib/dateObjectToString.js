import maybeAddTrailingZero from "./maybeAddTrailingZero";

/**
 * Takes in a date object and returns a date string (YYYY-MM-DD)
 * @param {Object} date Date object
 * @return {String} Date string (YYYY-MM-DD)
 */
export default function dateObjectToString(date) {
  const year = date.getUTCFullYear();
  const month = maybeAddTrailingZero(date.getUTCMonth() + 1);
  const day = maybeAddTrailingZero(date.getUTCDate());

  return `${year}-${month}-${day}`;
}
