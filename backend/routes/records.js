const router = require("express").Router();

const { loginSchema } = require("../validationSchemas");
const bcrypt = require("bcryptjs");
const { getRecords, createRecords } = require("../controller/recordController");
const { verifyToken2 } = require("../middleware/verifyToken");

router.get("/getRecords", verifyToken2, getRecords);
router.post("/create", verifyToken2, createRecords);

module.exports = router;
