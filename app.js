const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const blogsRouter = require("./routes/blogsRouter");

app.use(express.json());

app.use("/api/v1", userRouter);

app.use("/api/v1", blogsRouter);

module.exports = app;
