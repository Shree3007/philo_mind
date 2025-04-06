const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const lessonRoutes = require("./src/routes/lessonRoutes");
const profileRoutes= require("./src/routes/profileRoutes");
const registerRoutes=require("./src/routes/registerRoutes");
const lessonProgress=require("./src/routes/lessonProgress");
const synclessons = require("./src/routes/synclessons");
const cors = require("cors")

dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

//connecting lessonRoutes
app.use("/api", lessonRoutes);
//connecting profileRoutes
app.use("/api",profileRoutes);
//connecting registerRoutes.js
app.use("/api",registerRoutes);
//connecting lessonProgress
app.use("/api",lessonProgress);
//connecting synclessons.js
app.use("/api",synclessons)



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});