const recordsDB = require("../models/record");
const { jwtDecode } = require("../utils/util");
const authUser = require("../models/auth");
var nodemailer = require("nodemailer");

const getOTP = async (req, res, next) => {};

const createRecords = async (req, res) => {
  let tokenHeader = req.headers["auth-token"];
  let jwtResult = await jwtDecode(tokenHeader);
  const loggedUser = await authUser.findOne({ _id: jwtResult.id });
  if (!loggedUser) {
    return res.status(404).send("Access Denied, Please check Token");
  }
  const User = new recordsDB({
    status: req.body.status,
    task: req.body.task,
    devId: { id: jwtResult.id, name: loggedUser.name },
    manager: { id: loggedUser.manager.id, name: loggedUser.manager.name },
    createdAt: Date.now(),
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
  console.log(loggedUser, "ppppppppppp", jwtResult);
  if (!loggedUser) {
    return res.status(404).send("Access Denied, Please check Token");
  }
  if (loggedUser.role === "dev") {
    let results = await recordsDB.find({ "devId.id": loggedUser.id });
    return res.status(200).send(results);
  } else {
    let results = await recordsDB.find(
      { "manager.id": loggedUser.id },
      { manager: 0 }
    );
    return res.status(200).send(results);
  }
};

module.exports = { getRecords, createRecords, getOTP };
