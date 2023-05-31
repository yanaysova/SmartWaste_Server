const trashBin = require("../Models/trashBinModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getBins = catchAsync(async (req, res, next) => {
  const path = req.file.path;
  const { cords } = req.body;
  console.log(JSON.parse(cords));
  console.log(path);
  const userLatitude = Number(cords.lat.toFixed(6));
  const userLongitude = Number(cords.lng.toFixed(6));
  //Add axios post request to data science model.
  const binType = req.body.type;
  const results = await trashBin
    .find({
      type: binType,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [userLongitude, userLatitude],
          },
          $maxDistance: 1000,
        },
      },
    })
    .limit(3);
  if (results === null) {
    return nextnext(new AppError("No matching trash bin found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      results,
    },
  });
});

module.exports = {
  getBins,
};
