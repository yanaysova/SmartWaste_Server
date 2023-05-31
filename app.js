const express = require("express");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHanlder = require("./Controllers/errorControllers");
const app = express();

const trashBinsRoutes = require("./Routes/trashBinsRoutes");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/bins", trashBinsRoutes);

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
