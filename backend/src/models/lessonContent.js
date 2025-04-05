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
    },
    status: {
        type: Boolean,
        default: false  
      }
},{timestamps:true});

module.exports= mongoose.model('LessonContent',lessoncontentSchema);