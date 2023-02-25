const router = require("express").Router();
const {
  authRegister,
  authLogin,
  authLogout,
} = require("../controller/authController");
const {
  getLeadDetails,
  getTeamDetails,
} = require("../controller/teamLeadController");
const { verifyToken2 } = require("../middleware/verifyToken");

router.post("/register", authRegister);

router.post("/login", authLogin);

router.post("/logout", verifyToken2, authLogout);
router.get("/getRole", getLeadDetails);
router.get("/getTeamDetails", getTeamDetails);

module.exports = router;