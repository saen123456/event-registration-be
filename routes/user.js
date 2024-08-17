const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Settings = require("../models/Settings");

// ลงทะเบียนเข้างาน
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const settings = await Settings.findOne();

    if (settings.availableSeats <= 0) {
      return res.status(400).json({ message: "No available seats" });
    }

    const newRegistration = new Registration({ firstName, lastName, phone });
    await newRegistration.save();

    settings.availableSeats -= 1;
    await settings.save();

    const registrations = await Registration.find().sort({ createdAt: 1 });

    res.status(201).json(registrations);
  } catch (error) {
    console.log(error);
  }
});

// ดูรายชื่อผู้ลงทะเบียน
router.get("/registrations", async (req, res) => {
  const registrations = await Registration.find().sort({ createdAt: 1 });
  res.json(registrations);
});

// ดูจำนวนที่นั่งคงเหลือ
router.get("/available-seats", async (req, res) => {
  const settings = await Settings.findOne();
  res.json({ availableSeats: settings.availableSeats });
});

// ดูจำนวนผู้ลงทะเบียนทั้งหมด
router.get("/total-registrations", async (req, res) => {
  const count = await Registration.countDocuments();
  res.json({ totalRegistrations: count });
});

module.exports = router;
