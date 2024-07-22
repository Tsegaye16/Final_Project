const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controlers/errorController");
// const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRouter");

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//implement cors policy
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
// app.use("/api/v1/tours", tourRouter);
app.use("/dsa/users", userRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

module.exports = app;
