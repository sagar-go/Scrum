const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manager: {
    name: {
      type: String,
    },
    _id: {
      type: String,
    },
  },
  otp: {
    value: {
      type: String,
    },
    otpTime: { type: Number },
  },
  isVerified: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", authSchema);
