const mongoose = require("mongoose");
const User = require("../models/User");
const Event = require("../models/Event");
const isLoggedIn = require("../lib/isLoggedIn");
const isValidDateString = require("../lib/isValidDateString");

module.exports = {
  me: (_parent, _args, ctx) => {
    return ctx.req.user;
  },

  events: async (_parent, { minDate, maxDate, user }, ctx) => {
    if (user && user !== ctx.req.user._id) {
      // Querying for a specific user, make sure it's admin
      isLoggedIn(ctx, ["ADMIN"]);
    } else {
      // Only logged in users can see events
      isLoggedIn(ctx);

      user = ctx.req.user._id;
    }

    if (
      !isValidDateString(minDate) ||
      !isValidDateString(maxDate) ||
      new Date(minDate) >= new Date(maxDate)
    ) {
      throw new Error("Please enter a valid range of dates");
    }

    const events = await Event.find({
      user: mongoose.Types.ObjectId(user),
      date: {
        $gte: minDate,
        $lte: maxDate,
      },
    }).populate("user");

    return events;
  },
};
