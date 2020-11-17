const moment = require("moment");

module.exports = {
  date: (parent) => {
    return moment.utc(parent.date).format("YYYY-MM-DD");
  },
};
