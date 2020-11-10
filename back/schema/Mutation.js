const mongoose = require("mongoose");
const Book = require("../models/Book");

module.exports = {
  addBook: (parent, args, ctx) => {
    const newBook = new Book(args);
    return newBook.save();
  },
};
