const mongoose = require('mongoose');


const LessonProgressSchema= new mongoose.Schema({
    lessonId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'LessonContent'
    },
    status:{
        type:Boolean,
        default: false,
    },
    completedAt:{
        type:Date
    }
});

const streakSchema = new mongoose.Schema({
    count: { type: Number, default: 1 },
    lastUpdated: { type: Date, default: null },
  });

const UserSchema = new mongoose.Schema({
    clerkUserId:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    progress:{
        type:[LessonProgressSchema],
        default:[]
    },
    streak: {
        type: streakSchema,
        default: () => ({}),  
    },
    badge: {
        type: String,
        default: "No Badge", 
      },          
},{timestamps:true});

module.exports = mongoose.model('User', UserSchema);