const mongoose = require('mongoose');


const LessonProgressSchema= new mongoose.Schema({
    lessonId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'LessonContent'
    },
    status:{
        type:String,
        enum:["not-started","in-progress","completed"],
        default:"not-started"
    },
    completedAt:{
        type:Date
    }
});

const GamificationSchema= new mongoose.Schema({
    streak:{
        type:Number,
        default:0
    },
    badges:{
        type:[String],
        default:[]
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const UserSchema = new mongoose.Schema({
    clerkUserId:{
        type:String,
        require:true,
        unique:true
    },
    progress:{
        type:[LessonProgressSchema],
        default:[]
    },
    gamification:{
        type:GamificationSchema,
        default:()=>({})
    }
},{timestamps:true});

module.exports = mongoose.model('User', UserSchema);
