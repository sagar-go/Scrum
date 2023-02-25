const recordsDB = require("../models/record");
const { jwtDecode } = require("../utils/util");
const authUser = require("../models/auth");

const createRecords = async (req, res) => {
  let tokenHeader = req.headers["auth-token"];
  let jwtResult = await jwtDecode(tokenHeader);
  const loggedUser = await authUser.findOne({ _id: jwtResult.id });
  const User = new recordsDB({
    status: req.body.status,
    task: req.body.task,
    devId: jwtResult.id,
    manager: loggedUser.manager,
  });

  try {
    await User.save();
    res.status(400).send({ message: "Task created successfully" });
  } catch (error) {
    res.status(404).send({ message: "FAILED", error });
  }
};

const getRecords = async (req, res) => {
  let tokenHeader = req.headers["auth-token"];
  let jwtResult = await jwtDecode(tokenHeader);
  const loggedUser = await authUser.findOne({ _id: jwtResult.id, v: 0 });
  if (loggedUser.role === "dev") {
    let results = await recordsDB.find(
      { devId: loggedUser._id },
      { manager: 0 }
    );
    return res.status(200).send(results);
  } else {
    let results = await recordsDB.find(
      { manager: loggedUser._id },
      { manager: 0 }
    );
    return res.status(200).send(results);
  }
};

module.exports = { getRecords, createRecords };
