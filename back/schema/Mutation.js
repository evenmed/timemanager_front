const mongoose = require("mongoose");
const User = require("../models/User");
const Event = require("../models/Event");
const isLoggedIn = require("../lib/isLoggedIn");
const generateToken = require("../lib/generateToken");
const isValidDateString = require("../lib/isValidDateString");

module.exports = {
  createUser: async (
    _parent,
    { username, preferredWorkTime, password, permissions },
    ctx
  ) => {
    // console.log(ctx);
    if (permissions && permissions.length) {
      // Setting custom permissions, make sure it's an admin or UM
      if (permissions.includes("ADMIN")) isLoggedIn(ctx, ["ADMIN"]);
      else isLoggedIn(ctx, ["ADMIN", "USERMANAGER"]);
    } else {
      permissions = ["USER"];
    }

    if (preferredWorkTime < 15 || preferredWorkTime > 1440)
      throw new Error(
        "Daily work objective must be between 15 mins and 24 hours"
      );

    const user = await User.register(
      new User({ username, permissions, preferredWorkTime }),
      password
    ).catch((e) => {
      throw e;
    });

    // Generate JWT token
    const token = generateToken({ userId: user._id });
    return token;
  },

  logIn: async (_parent, { username, password }, _ctx) => {
    const { user } = await User.authenticate()(username, password);
    if (!user) throw new Error("Invalid credentials. Please try again.");

    // Generate JWT token
    const token = generateToken({ userId: user._id });
    return token;
  },

  updateAccount: async (
    _parent,
    { userId, username, preferredWorkTime, permissions, currentPw, newPw },
    ctx
  ) => {
    isLoggedIn(ctx);

    const updatingOtherAcc = userId !== ctx.req.user._id;

    if (updatingOtherAcc) {
      // Updating someone else's account
      isLoggedIn(ctx, ["ADMIN", "USERMANAGER"]);
    }

    // Get user object
    const user = await User.findById(userId);

    // Only admins can modify admins
    if (user.permissions.includes("ADMIN")) isLoggedIn(ctx, ["ADMIN"]);

    // Trying to update pw
    if (newPw) {
      if (!updatingOtherAcc) {
        // Updating our own pw, make sure current pw is correct
        const res = await user.authenticate(currentPw);
        if (res.error) throw new Error("Incorrect password. Please try again.");
      }

      const setPwRes = await user.setPassword(newPw);

      if (!setPwRes) {
        throw new Error("An error occurred while updating the password");
      }
    }

    if (permissions && permissions.length) {
      // Trying to assign permissions, make sure it's an admin or UM
      if (permissions.includes("ADMIN")) isLoggedIn(ctx, ["ADMIN"]);
      else isLoggedIn(ctx, ["ADMIN", "USERMANAGER"]);

      user.permissions = permissions;
    }

    user.username = username;
    user.preferredWorkTime = preferredWorkTime;

    return user.save();
  },

  updateEvent: async (_parent, args, ctx) => {
    isLoggedIn(ctx);

    if (args.author && args.author !== ctx.req.user._id) {
      // Updating / creating an event from someone else
      isLoggedIn(ctx, ["ADMIN"]);
    }

    if (!isValidDateString(args.date)) {
      throw new Error("Please enter a valid date in YYYY-MM-DD format");
    }

    const event = args._id
      ? await Event.findOne({ _id: mongoose.Types.ObjectId(args._id) })
      : new Event({
          ...args,
          user: args.author || ctx.req.user._id,
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
