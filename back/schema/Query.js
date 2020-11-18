const mongoose = require("mongoose");
const User = require("../models/User");
const Event = require("../models/Event");
const isLoggedIn = require("../lib/isLoggedIn");
const isValidDateString = require("../lib/isValidDateString");

module.exports = {
  /**
   * Returns current user data
   */
  me: (_parent, _args, ctx) => {
    return ctx.req.user;
  },

  /**
   * Query events by user
   */
  events: async (_parent, { user }, ctx) => {
    // Only logged in users can see events
    isLoggedIn(ctx);

    if (user && user !== ctx.req.user._id) {
      // Querying for a specific user, make sure it's admin
      isLoggedIn(ctx, ["ADMIN"]);
    } else {
      user = ctx.req.user._id;
    }

    // if (
    //   !isValidDateString(minDate) ||
    //   !isValidDateString(maxDate) ||
    //   new Date(minDate) >= new Date(maxDate)
    // ) {
    //   throw new Error("Please enter a valid range of dates");
    // }

    const events = await Event.find({
      user: mongoose.Types.ObjectId(user),
      // date: {
      //   $gte: minDate,
      //   $lt: maxDate, // Max date is exclusive
      // },
    }).populate("user");

    return events;
  },

  /**
   * Get a single event by its ID
   */
  event: (_parent, { _id }, ctx) => {
    isLoggedIn(ctx);

    if (!_id) return null;

    // If user isn't admin and doesn't own event, will return null
    const user = isLoggedIn(ctx, ["ADMIN"], true)
      ? { $ne: null }
      : ctx.req.user._id;

    return Event.findOne({
      _id: mongoose.Types.ObjectId(_id),
      user,
    });
  },
};
