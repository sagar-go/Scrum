const authUser = require("../models/auth");
const { jwtDecode } = require("../utils/util");

const getLeadDetails = async (req, res) => {
  const list = await authUser.find({ role: req.body.role }, { email: 1 });
  if (list) {
    return res.send(list);
  }

  return res.send("No results");
};

const getTeamDetails = async (req, res) => {
  let tokenHeader = req.headers["auth-token"];

  if (!tokenHeader) {
    return res.status(401).send("ACCESS DENIED WITHOUT TOKEN");
  }

  let jwtResult = await jwtDecode(tokenHeader);
  // console.log(jwtResult, "jwtResultjwtResult");

  const list = await authUser.find(
    { manager: jwtResult.id },
    { name: 1, email: 1 }
  );
  if (!list) {
    return res.send("No results");
  }

  // console.log(list);
  return res.send(list);
};

module.exports = { getLeadDetails, getTeamDetails };
