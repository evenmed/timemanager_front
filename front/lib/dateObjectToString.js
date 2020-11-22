import maybeAddTrailingZero from "./maybeAddTrailingZero";

/**
 * Takes in a date object and returns a UTC date string (YYYY-MM-DD)
 *
 * @param {Object} date Date object
 * @param {Boolean} addTime Add "T00:00:00" at the end of string
 * @return {String} UTC date string (YYYY-MM-DD)
 */
export default function dateObjectToString(date, addTime = false) {
  if (!date || typeof date.getUTCFullYear !== "function") return "";

  const year = date.getUTCFullYear();
  const month = maybeAddTrailingZero(date.getUTCMonth() + 1);
  const day = maybeAddTrailingZero(date.getUTCDate());

  if (!year || !month || !day) {
    console.error("dateObjToString fn: invalid date", date, year, month, day);
    return "";
  }

  return `${year}-${month}-${day}${addTime ? "T00:00:00" : ""}`;
}
