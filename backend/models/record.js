const mongoose = require("mongoose");

const recordsSchema = new mongoose.Schema({
  manager: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  devId: {
    type: String,
  },
  task: {
    type: String,
    required: true,
  },
  // toDO: {
  //   type: String,
  // },
  // inProgress: {
  //   type: String,
  // },
  // codeReview: {
  //   type: String,
  // },
  // completed: {
  //   type: String,
  // },
});

module.exports = mongoose.model("Records", recordsSchema);
