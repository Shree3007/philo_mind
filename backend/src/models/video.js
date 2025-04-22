
const mongoose = require ("mongoose");

const videoSchema = new mongoose.Schema({
    link:{
        type:"string",
        required:true
    }
});

module.exports = mongoose.model("video",videoSchema);