const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// ตั้งค่าที่นั่งทั้งหมด
router.post("/set-seats", async (req, res) => {
  const { totalSeats } = req.body;

  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings({ totalSeats, availableSeats: totalSeats });
  } else {
    settings.availableSeats += totalSeats - settings.totalSeats;
    settings.totalSeats = totalSeats;
  }

  await settings.save();
  res.status(200).json(settings);
});

// ดูรายชื่อผู้ลงทะเบียน (เหมือน user)
router.get("/registrations", async (req, res) => {
  const registrations = await Registration.find().sort({ createdAt: -1 });
  res.json(registrations);
});

// ดูจำนวนที่นั่งคงเหลือ (เหมือน user)
router.get("/available-seats", async (req, res) => {
  const settings = await Settings.findOne();
  res.json({ availableSeats: settings.availableSeats });
});

// ดูจำนวนผู้ลงทะเบียนทั้งหมด (เหมือน user)
router.get("/total-registrations", async (req, res) => {
  const count = await Registration.countDocuments();
  res.json({ totalRegistrations: count });
});

module.exports = router;
