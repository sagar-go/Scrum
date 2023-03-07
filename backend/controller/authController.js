const authUser = require("../models/auth");
const { signUpSchema } = require("../validationSchemas");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { jwtDecode, roles } = require("../utils/util");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sagarrbarthwal@gmail.com",
    pass: "gfcntesswraxjwwe",
  },
});

const authRegister = async (req, res) => {
  const { error } = signUpSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .send({ message: error.details[0].message, success: false });
  }

  const emailExists = await authUser.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (emailExists) {
    return res
      .status(200)
      .send({ message: "Email already exists", success: false });
  }

  const validRoles = Object.keys(roles);
  if (!validRoles.includes(req.body.role)) {
    return res
      .status(400)
      .send({ success: false, message: "Role does not exist" });
  }

  const salt = await bcrypt.genSalt(5); //complexity of salt generation
  const hashpassword = await bcrypt.hash(req.body.password, salt); // password hashing

  var d1 = new Date(),
    d2 = new Date(d1);
  let otpTime = d2.setMinutes(d1.getMinutes() + 1);

  const User = new authUser({
    email: req.body.email.toLowerCase(),
    password: hashpassword,
    role: req.body.role,
    name: req.body.name,
    manager: req.body.manager ? req.body.manager : null,
    isVerified: false,
    otp: { otpTime: otpTime, value: Math.floor(1000 + Math.random() * 9000) },
  });
  console.log(User, "asdasd");
  try {
    let myUser = await User.save();
    res.status(400).send({
      message: "User created successfully",
      success: true,
      otp: myUser.otp.value,
      id: myUser._id,
    });

    const mailOptions = {
      from: "sagarrbarthwal@gmail.com",
      to: myUser.email,
      subject: "Email Verification",
      text: `Hi your OTP for verification is ${myUser.otp.value}. Please note that this OTP will get expired after 2 minutes`,
      // html: '<a href="www.google.com">Click this link to verify your account</a>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // do something useful
      }
    });
  } catch (error) {
    res.status(404).send({ message: "Some Error Occured", success: false });
  }
};

const otpVerify = async (req, res) => {
  const loggedUser = await authUser.findOne({
    _id: req.body.id,
  });

  if (!loggedUser) {
    return res
      .status(404)
      .send({ message: "USER DOES NOT exist", success: false });
  }

  var d3 = new Date(),
    d4 = new Date(d3);
  let otpTIme2 = d4.setMinutes(d3.getMinutes());

  if (otpTIme2 > loggedUser.otp.otpTime) {
    return res.status(200).send({ message: "Time expired", success: false });
  }

  if (loggedUser.otp.value === req.body.otp) {
    await authUser.findByIdAndUpdate(
      { _id: req.body.id },
      { isVerified: true }
    );
    return res.status(200).send({ message: "SUCCESSFUL", success: true });
  } else {
    return res.status(200).send({ message: "Wrong OTP", success: false });
  }
};

const resendOtp = async (req, res) => {
  const loggedUser = await authUser.findOne({
    _id: req.body.id,
  });

  if (!loggedUser) {
    return res.status(404).send({ message: "USER DOES NOT exist" });
  }

  var d1 = new Date(),
    d2 = new Date(d1);
  let otpTime = d2.setMinutes(d1.getMinutes() + 1);

  const updateUser = await authUser.findByIdAndUpdate(
    { _id: req.body.id },
    {
      "otp.value": Math.floor(1000 + Math.random() * 9000),
      "otp.otpTime": otpTime,
    },
    { returnDocument: "after" }
  );

  const mailOptions = {
    from: "sagarrbarthwal@gmail.com",
    to: loggedUser.email,
    subject: "Resend OTP Text",
    text: `Hi your OTP for verification is ${updateUser.otp.value}. Please note that this OTP will get expired after 2 minutes`,
    // html: '<a href="www.google.com">Click this link to verify your account</a>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
  return res.status(200).send({ success: true });
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
    return res.status(404).send({ message: "Invalid password" });
  }

  // if (loggedUser.token !== null) {
  //   return res.send({ message: "You are already logged in" });
  // }
  if (!loggedUser.isVerified) {
    return res.send({
      success: false,
      message: "User not verified",
      id: loggedUser._id,
    });
  }

  //Create token

  const token = jwt.sign(
    { id: loggedUser._id, role: loggedUser.role },
    process.env.TOKEN_SECRET
  );

  await authUser.findOneAndUpdate({ _id: loggedUser._id }, { token: token });

  return res.send({ token: token, role: loggedUser.role, success: true });

};

const forgotPassword = async (req, res) => {
  const loggedUser = await authUser.findOne({
    email: req.body.email,
  });

  const mailOptions = {
    from: "sagarrbarthwal@gmail.com",
    to: loggedUser.email,
    subject: "Resend OTP Text",
    // text: `Hi your OTP for verification is ${updateUser.otp.value}. Please note that this OTP will get expired after 2 minutes`,
    html: `<p> Please click on this <a href=www.google.com/${loggedUser._id}>link</a> to change your password. </p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });

  return res.send({ message: "success", success: true });
};

const updatePassword = async (req, res) => {
  const loggedUser = await authUser.findById({
    _id: req.body.id,
  });

  if (!loggedUser) {
    return res.status(400).send({ message: "User not found", success: false });
  }

  const salt = await bcrypt.genSalt(5); //complexity of salt generation
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  const updateUser = await authUser.findByIdAndUpdate(
    { _id: req.body.id },
    {
      password: hashpassword,
    },
    { returnDocument: "after" }
  );

  return res
    .status(200)
    .send({ message: "Password updated successfully", success: true });


};

const forgotPassword = async (req, res) => {
  const loggedUser = await authUser.findById({
    _id: req.body.id,
  });

  const mailOptions = {
    from: "sagarrbarthwal@gmail.com",
    to: loggedUser.email,
    subject: "Resend OTP Text",
    // text: `Hi your OTP for verification is ${updateUser.otp.value}. Please note that this OTP will get expired after 2 minutes`,
    html: `<p> Please click on this <a href=www.google.com/${loggedUser._id}>link</a> to verify your account </p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });

  return res.send({ message: "success", success: true });
};

const updatePassword = async (req, res) => {};

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

module.exports = {
  authRegister,
  authLogin,
  authLogout,
  otpVerify,
  resendOtp,
  forgotPassword,
  updatePassword,
};
