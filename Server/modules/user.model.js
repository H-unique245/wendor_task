const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  phone: {
    required: true,
    type: Number,
  },
  password: String,
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
