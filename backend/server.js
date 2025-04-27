const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const lessonRoutes = require("./src/routes/lessonRoutes");
const profileRoutes= require("./src/routes/profileRoutes");
const registerRoutes=require("./src/routes/registerRoutes");
const lessonProgress=require("./src/routes/lessonProgress");
const aiRoute = require("./src/routes/aiRoute");
const psyRoutes= require("./src/routes/psyRoutes");
const videos = require("./src/routes/videoRoutes");
const moodRoutes = require("./src/routes/moodRoutes");
const checkStreak= require("./src/routes/checkStreak");
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const psyCityRoutes = require("./src/routes/psyCityRoutes");
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

app.use("/api",aiRoute);
//connecting psyRoutes

app.use("/api",psyRoutes);
app.use("/api", psyCityRoutes); 
//videoroute
app.use("/api",videos)

app.use("/api", moodRoutes);

app.use("/api",checkStreak);

app.use("/api",feedbackRoutes);


app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});