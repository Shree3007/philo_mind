const mongoose = require('mongoose');

const lessoncontentSchema = new mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'LessonCategory',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports= mongoose.model('LessonContent',lessoncontentSchema);