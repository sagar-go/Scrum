const mongoose = require("mongoose");

const recordsSchema = new mongoose.Schema({
  manager: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  status: {
    type: String,
    required: true,
  },
  devId: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  task: {
    type: String,
    required: true,
  },
  createdAt: { type: Date },
});

module.exports = mongoose.model("Records", recordsSchema);
