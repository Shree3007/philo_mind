const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const lessonRoutes = require("./src/routes/lessonRoutes");
const profileRoutes= require("./src/routes/profileRoutes")
const cors = require("cors"); // Import CORS

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
app.use("/api",profileRoutes)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});
