const mongoose = require("mongoose");

const psychiatristSchema = new mongoose.Schema({
    hospitalName:{
        type:"string",
        required:"true"
    },
    address:{
        type:"string",
        required:"true"
    },
    city:{
        type:"string",
        required:"true"
    },
    mapLink:{
        type:"string"
    }
});

module.exports = mongoose.model('Psychiatrist',psychiatristSchema);