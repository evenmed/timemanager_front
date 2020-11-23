const moment = require("moment");

/**
 * Validates a date in YYYY-MM-DD format
 *
 * @param {String} str Date string in YYYY-MM-DD format
 *
 * @returns {Boolean} `true` if valid, `false` if not
 */
const isValidDateString = (str) => moment(str, "YYYY-MM-DD", true).isValid();

module.exports = isValidDateString;
