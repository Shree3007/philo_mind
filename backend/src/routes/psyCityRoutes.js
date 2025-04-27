const express = require("express");
const router = express.Router();
const Psychiatrist = require("../models/Psychiatrist");

router.get('/cities', async (req, res) => {
  try {
    const hospitals = await Psychiatrist.find({}, 'city');
    const cities = [...new Set(hospitals.map((hospital) => hospital.city))];
    res.status(200).json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

module.exports = router;
