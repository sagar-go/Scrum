const authUser = require("../models/auth");
const { signUpSchema } = require("../validationSchemas");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtDecode, roles } = require("../utils/util");

const authRegister = async (req, res) => {
  const { error } = signUpSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExists = await authUser.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  const validRoles = Object.keys(roles);
  if (!validRoles.includes(req.body.role)) {
    return res.status(400).send("Role does not exist");
  }

  const salt = await bcrypt.genSalt(5); //complexity of salt generation
  const hashpassword = await bcrypt.hash(req.body.password, salt); // password hashing

  const User = new authUser({
    email: req.body.email.toLowerCase(),
    password: hashpassword,
    role: req.body.role,
    name: req.body.name,
    manager: req.body.manager ? req.body.manager : null,
    token: null,
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sagarrbarthwal@gmail.com",
      pass: "gfcntesswraxjwwe",
    },
  });

  const OTP = Math.floor(1000 + Math.random() * 9000);

  const mailOptions = {
    from: "sagarrbarthwal@gmail.com",
    to: "miteshkumar862@gmail.com",
    subject: "Email Verification",
    text: `Hi your OTP for verification is ${OTP}. Please note that this OTP will get expired after 2 minutes`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });

  try {
    await User.save();
    res.status(400).send({ message: "User created successfully" });
  } catch (error) {
    res.status(404).send("Some Error Occured");
  }
};

const authLogin = async (req, res) => {
  const loggedUser = await authUser.findOne({
    email: req.body.email.toLowerCase(),
  });

  if (!loggedUser) {
    return res.status(400).send("Email doesn't exist");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    loggedUser.password
  );

  if (!validPassword) {
    return res.status(404).send("Invalid password");
  }

  if (loggedUser.token !== null) {
    return res.send("You are already logged in");
  }

  //Create token

  const token = jwt.sign(
    { id: loggedUser._id, role: loggedUser.role },
    process.env.TOKEN_SECRET
  );

  await authUser.findOneAndUpdate({ _id: loggedUser._id }, { token: token });

  res.send({ token: token, role: loggedUser.role });
};

const authLogout = async (req, res) => {
  //   console.log(req.headers["auth-token"], "header");
  let tokenHeader = req.headers["auth-token"];

  if (!tokenHeader) {
    return res.status(401).send("ACCESS DENIED WITHOUT TOKEN");
  }

  let jwtResult = await jwtDecode(tokenHeader);
  console.log(jwtResult, "jwtResultjwtResult");

  let loggedUser = await authUser.findOne({ _id: jwtResult.id });
  console.log(loggedUser, "loggedUserloggedUser");

  if (!loggedUser || loggedUser.token !== tokenHeader) {
    return res.send("ACCESS DENIED. PLEASE CHECK YOUR TOKEN");
  }

  await authUser.findOneAndUpdate({ _id: jwtResult.id }, { token: null });
  return res.send("Logout success");
};

module.exports = { authRegister, authLogin, authLogout };
