const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  passportLocalMongoose = require("passport-local-mongoose"),
  validator = require("validator");

const availablePermissions = ["ADMIN", "USERMANAGER", "USER"];

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    required: "Please enter a valid username",
  },
  permissions: [
    {
      type: String,
      enum: availablePermissions,
      required: "Users need at least 1 permission",
    },
  ],
  preferredWorkTime: {
    type: Number,
    min: [15, "Daily work objective must be at least 15 minutes"],
    max: [1440, "Daily work objective can't be greater than 24 hours"],
    default: 480,
    required: "Please specify your preferred work time",
  },
});

UserSchema.plugin(passportLocalMongoose, {
  passwordValidator: (pw, cb) => {
    if (pw.length < 5) return cb("Password must be at least 5 characters");
    return cb();
  },
});

module.exports = mongoose.model("User", UserSchema);
module.exports.availablePermissions = availablePermissions;
