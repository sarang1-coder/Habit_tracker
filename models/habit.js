const mongoose=require('mongoose');


const habitSchema=new mongoose.Schema({
    habitName:{
        type:String,
        required:true
    },
    userRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    habitDates:[{
        date: String,
        complete: String
    }],
    favouriteHabit:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Habit=mongoose.model("Habit",habitSchema);

module.exports=Habit;


