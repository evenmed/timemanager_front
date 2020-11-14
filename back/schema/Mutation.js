const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Book = require("../models/Book");
const User = require("../models/User");
const isLoggedIn = require("../lib/isLoggedIn");

module.exports = {
  addBook: (parent, args, ctx) => {
    const newBook = new Book(args);
    return newBook.save();
  },

  createUser: (_parent, { username, password, permissions }, ctx) => {
    // console.log(ctx);
    if (permissions && permissions.length) {
      // Setting custom permissions, make sure it's an admin or UM
      isLoggedIn(ctx, ["ADMIN", "USERMANAGER", "USER"]);
    } else {
      permissions = ["USER"];
    }
    return User.register(new User({ username, permissions }), password);
  },

  logIn: async (parent, { username, password }, ctx) => {
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
};
