const router = require("express").Router();

const { loginSchema } = require("../validationSchemas");
const bcrypt = require("bcryptjs");
const {
  getRecords,
  createRecords,
  getOTP,
} = require("../controller/recordController");
const { verifyToken2 } = require("../middleware/verifyToken");

router.get("/getRecords", verifyToken2, getRecords);
router.post("/create", createRecords);
router.get("/getotp", getOTP);

module.exports = router;
