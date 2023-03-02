const jwt_decode = require("jwt-decode");

const nodemailer = require("nodemailer");
let testAccount = await nodemailer.createTestAccount();
console.log(testAccount);

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async () => {
  let testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });
};
sendMail();
const jwtDecode = (token) => {
  let decoded = jwt_decode(token);
  return decoded;
};

const roles = {
  manager: "manager",
  dev: "dev",
};

module.exports = { jwtDecode, roles };
