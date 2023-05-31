const trashBin = require("../Models/trashBinModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getBins = catchAsync(async (req, res, next) => {
  const results = await trashBin.find();
  res.status(200).json({
    status: "success",
    results: results.length,
    data: {
      results,
    },
  });
});

module.exports = {
  getBins,
};
