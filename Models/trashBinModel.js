const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trashBinSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  street: {
    type: String,
    lowercase: true,
  },
  number: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});

trashBinSchema.index({ location: "2dsphere" });

const trashBin = mongoose.model("trashBins", trashBinSchema);

module.exports = trashBin;
