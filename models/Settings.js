const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

module.exports = mongoose.model("Settings", settingsSchema);
