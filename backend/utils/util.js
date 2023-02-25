const jwt_decode = require("jwt-decode");

const jwtDecode = (token) => {
  let decoded = jwt_decode(token);
  return decoded;
};

const roles = {
  teamLead: "teamLead",
  dev: "dev",
};

module.exports = { jwtDecode, roles };
