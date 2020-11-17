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
      // Setting custom permissions, make sure it's an admin or UM
      isLoggedIn(ctx, ["ADMIN", "USERMANAGER"]);
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

    if (args._id && event.user !== ctx.req.user._id) {
      // User doesn't own event, make sure it's an admin
      isLoggedIn(ctx, ["ADMIN"]);
    }

    await event.save();
    // await event.populate("user").execPopulate();

    return event.populate("user").execPopulate();
  },
};
