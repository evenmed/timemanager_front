/**
 * Adds a trailing zero if num is less than 10
 * @param {Number} num Must be an integer
 * @return {String} Number as a string
 */
export default function maybeAddTrailingZero(num) {
  if (`${parseInt(num)}` !== `${num}`) return "";

  if (num < 10) return `0${num}`;

  return `${num}`;
}
