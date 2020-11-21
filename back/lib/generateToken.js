const jwt = require("jsonwebtoken");
/**
 * Generate a signed JWT token
 * @param {Object|Buffer|String} string Valid JSON
 * @param {String|Number} expiresIn Expressed in seconds or a string describing a time span
 *
 * @returns {String} Signed token
 */
function generateToken(json, expiresIn = "30 days") {
  return jwt.sign(json, process.env.APP_SECRET, { expiresIn });
}

module.exports = generateToken;
