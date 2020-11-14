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
    validate: [validator.isEmail, "Please enter a valid email"],
    required: "Please enter a valid email",
  },
  permissions: [
    {
      type: String,
      enum: availablePermissions,
      required: "Users need at least 1 permission",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
module.exports.availablePermissions = availablePermissions;
