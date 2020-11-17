const moment = require("moment");

module.exports = {
  date: (parent) => {
    // Make sure date is sent in YYYY-MM-DD format
    return moment.utc(parent.date).format("YYYY-MM-DD");
  },
};
