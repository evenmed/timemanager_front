const mongoose = require("mongoose");
const Book = require("../models/Book");

module.exports = {
  books: () => {
    return Book.find();
  },
  book: () => {
    return Book.findOne();
  },
};
