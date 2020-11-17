/**
 * Validates a date in YYYY-MM-DD format
 *
 * @param {String} str Date string in YYYY-MM-DD format
 *
 * @returns {Boolean}
 */
const isValidDateString = (str) => {
  // Regex to match YYYY-MM-DD strings.
  // Source: https://www.regular-expressions.info/dates.html
  const dateRegex = new RegExp(
    /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  );

  return dateRegex.test(str);
};

module.exports = isValidDateString;
