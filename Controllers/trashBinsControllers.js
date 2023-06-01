const trashBin = require("../Models/trashBinModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getBins = catchAsync(async (req, res, next) => {
  // const path = req.file.path;
  // console.log(path);
  const { cords } = req.body;
  const parsedCords = JSON.parse(cords);
  const userLatitude = Number(parsedCords.lat.toFixed(6));
  const userLongitude = Number(parsedCords.lng.toFixed(6));
  //Add axios post request to data science model.
  const binType = req.body.type;
  console.log(binType);
  console.log(`Latitude: ${userLatitude}`);
  console.log(typeof userLatitude);
  console.log(`Longitude: ${userLongitude}`);
  const results = await trashBin
    .find({
      type: binType,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [userLongitude, userLatitude],
          },
          $maxDistance: 5000,
        },
      },
    })
    .limit(3);
  if (results.length === 0) {
    return next(new AppError("No matching trash bin found.", 404));
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
