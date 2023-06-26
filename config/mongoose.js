const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Habit_tracker_app');

const db=mongoose.connection;


db.on('error',console.error.bind(console,'Error in connection DB'));


db.once('open',function(){
    console.log('Connected to DB');
});


module.exports=db;