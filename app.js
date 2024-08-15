const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://root:ISwyzFzgPgR9xbbM@cluster0.rym32.mongodb.net/event-test?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("connect database success!!");
  })
  .catch((error) => {
    console.log("connect database failed", error);
  });

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
