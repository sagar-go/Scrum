const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const recordsRoute = require("./routes/records");

dotEnv.config();

app.use(express.json());
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => console.log("CONNECTED TO SERVER"));

app.use("/auth", authRoute);
app.use("/records", recordsRoute);

app.listen(4000, (req, res) => console.log("SERVER IS RUNNING !!!!!!!!!!!!"));
