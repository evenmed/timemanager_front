/**
 * Checks if an array includes a string or any of an array of strings
 * @param {String[]} haystack Array to check
 * @param {String|String[]} needle Value or array of values to look for in array
 *
 * @returns {Boolean} `true` if value was found in array, `false` if not
 */
const arrayIncludesAny = (haystack, needle) => {
  if (Array.isArray(needle)) {
    return needle.some((n) => haystack.includes(n));
  }

  return haystack.includes(needle);
};

export default arrayIncludesAny;
