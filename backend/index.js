const express = require("express");
require("dotenv").config();
const { userRouter } = require("./Routes/user.routes");
const { blogRouter } = require("./Routes/blog.routes");
const { connection } = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to server home page" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is running at port ${process.env.PORT}`);
    console.log("connected to DB");
  } catch (err) {
    console.log(`index.js catch block error = ${err.message}`);
  }
});
