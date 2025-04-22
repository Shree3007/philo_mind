const express = require("express");
const router = express.Router();
const Psychiatrist = require("../models/Psychiatrist");

router.get('/psy', async (req, res) => {
    try {
        const { city, page = 1, limit = 10 } = req.query;

        const filter = city ? { city } : {}; // Filter by city if provided

        const skip = (page - 1) * limit; // Skip for pagination
        const hospitals = await Psychiatrist.find(filter)
            .skip(skip)
            .limit(Number(limit)); // Make sure to pass a number for limit

        const totalCount = await Psychiatrist.countDocuments(filter); // Count docs matching filter
        const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

        res.status(200).json({
            hospitals,
            totalCount,
            totalPages,
            currentPage: Number(page), // Return the current page number
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hospitals data' });
    }
});

module.exports = router;
