const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: "Books need a title",
  },
  author: {
    type: String,
    required: "Books need an author",
  },
});

module.exports = mongoose.model("Book", BookSchema);
