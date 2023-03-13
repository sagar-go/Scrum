const router = require("express").Router();
const {
  authRegister,
  authLogin,
  authLogout,
  otpVerify,
  resendOtp,
  forgotPassword,
  updatePassword,
} = require("../controller/authController");
const {
  getLeadDetails,
  getTeamDetails,
} = require("../controller/teamLeadController");
const { verifyToken2 } = require("../middleware/verifyToken");

router.post("/register", authRegister);

router.post("/login", authLogin);

router.post("/logout", verifyToken2, authLogout);
router.post("/getRole", getLeadDetails);
router.get("/getTeamDetails", getTeamDetails);
router.post("/otpverify", otpVerify);
router.post("/resendotp", resendOtp);
router.post("/forgotpassword", forgotPassword);
router.post("/updatepassword", updatePassword);

module.exports = router;
