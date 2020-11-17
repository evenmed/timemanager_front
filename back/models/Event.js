const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: "Please enter a title",
    maxlength: [100, "Event title can't be longer than 100 characters"],
  },
  date: {
    type: Date,
    required: "Please specify the event's date",
  },
  time: {
    type: Number,
    min: [15, "Events must be at least 15 minutes"],
    max: [1440, "Events can't be longer than 24 hours"],
    required: "Please specify the event's duration",
  },
  notes: {
    type: String,
    maxlength: [500, "Notes can't be longer than 500 characters"],
    required: false,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: "Events must belong to a specific user",
  },
});

module.exports = mongoose.model("Event", EventSchema);
