const jwt_decode = require("jwt-decode");

const jwtDecode = (token) => {
  let decoded = jwt_decode(token);
  return decoded;
};

const roles = {
  manager: "manager",
  dev: "dev",
};

// let sendMail = transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

module.exports = { jwtDecode, roles };
