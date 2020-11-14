const mongoose = require("mongoose");
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
      isLoggedIn(ctx, ["ADMIN", "USERMANAGER"]);
    } else {
      permissions = ["USER"];
    }
    return User.register(new User({ username, permissions }), password);
  },
};
