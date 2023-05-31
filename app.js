const express = require("express");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHanlder = require("./Controllers/errorControllers");
const app = express();

const trashBinsRoutes = require("./Routes/trashBinsRoutes");

app.use(express.json());
app.use(cors());

app.use("/bins", trashBinsRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Handles non-existing routes
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `The route ${req.originalUrl} does not exist on this server`,
      404
    )
  );
});

app.use(globalErrorHanlder);

module.exports = app;
