const moment = require("moment");

/**
 * Validates a date in YYYY-MM-DD format
 *
 * @param {String} str Date string in YYYY-MM-DD format
 *
 * @returns {Boolean}
 */
const isValidDateString = (str) => moment(str, "YYYY-MM-DD", true).isValid();

module.exports = isValidDateString;
