const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  token: {
    type: "string",
  },
  role: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  manager: { type: "string" },
});

module.exports = mongoose.model("User", authSchema);
