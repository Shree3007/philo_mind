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
    count: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: null },
  });


/*const GamificationSchema= new mongoose.Schema({
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
});*/

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
    /*gamification:{
        type:GamificationSchema,
        default:()=>({})
    }*/
    streak: {
        type: streakSchema,
        default: () => ({}),  
    }
              

},{timestamps:true});

module.exports = mongoose.model('User', UserSchema);