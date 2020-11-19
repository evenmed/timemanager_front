const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Event = require("../models/Event");
const isLoggedIn = require("../lib/isLoggedIn");
const isValidDateString = require("../lib/isValidDateString");

module.exports = {
  createUser: async (_parent, { username, password, permissions }, ctx) => {
    // console.log(ctx);
    if (permissions && permissions.length) {
      // Setting custom permissions, make sure it's an admin
      isLoggedIn(ctx, ["ADMIN"]);
    } else {
      permissions = ["USER"];
    }

    const user = await User.register(
      new User({ username, permissions }),
      password
    ).catch((e) => {
      throw e;
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);

    // Set the cookie
    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 31,
    });

    // Return user
    return user;
  },

  logIn: async (_parent, { username, password }, ctx) => {
    const { user } = await User.authenticate()(username, password);
    if (!user) throw new Error("Invalid credentials. Please try again.");

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);

    // Set the cookie
    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 31,
    });

    // Return user
    return user;
  },

  logOut: async (_parent, _args, ctx) => {
    // Delete the cookie
    ctx.res.clearCookie("token");

    // Return user
    return true;
  },

  updateAccount: (
    _parent,
    { userId, username, preferredWorkTime, permissions },
    ctx
  ) => {
    isLoggedIn(ctx);

    const update = { username, preferredWorkTime };

    if (userId !== ctx.req.user._id) {
      // Updating someone else's account
      isLoggedIn(ctx, ["ADMIN", "USERMANAGER"]);
    }

    if (permissions && permissions.length) {
      // Trying to assign permissions, make sure it's an admin
      isLoggedIn(ctx, ["ADMIN"]);
      update.permissions = permissions;
    }

    return User.findOneAndUpdate({ _id: userId }, update, {
      runValidators: true,
    });
  },

  updateEvent: async (_parent, args, ctx) => {
    isLoggedIn(ctx);

    // console.log("updateEvent", args);

    if (!isValidDateString(args.date)) {
      throw new Error("Please enter a valid date in YYYY-MM-DD format");
    }

    const event = args._id
      ? await Event.findOne({ _id: mongoose.Types.ObjectId(args._id) })
      : new Event({
          ...args,
          user: ctx.req.user,
        });

    if (!event) {
      if (args._id)
        throw new Error("The event you're trying to update doesn't exist");

      throw new Error(
        "An unknown error occurred while creating the event. Please try again"
      );
    }

    if (args._id) {
      if (String(event.user) !== ctx.req.user._id) {
        // User doesn't own event, make sure it's an admin
        isLoggedIn(ctx, ["ADMIN"]);
      }

      event.title = args.title;
      event.date = args.date;
      event.time = args.time;
      event.notes = args.notes;
    }

    await event.save();

    return event.populate("user").execPopulate();
  },

  deleteEvent: async (_parent, { _id }, ctx) => {
    isLoggedIn(ctx);

    const user = isLoggedIn(ctx, ["ADMIN"], true)
      ? { $ne: null }
      : ctx.req.user._id;

    const res = await Event.deleteOne({
      _id,
      user,
    });

    if (res.deletedCount > 0) return true;

    throw new Error(
      "Couldn't delete event. The event may not exist, or you may not be authorized to delete it."
    );
  },
};
