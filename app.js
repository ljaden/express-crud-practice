const express = require("express");
const app = express();
// import router modules
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// middleware - function that can modify the incoming request
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// mount routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
