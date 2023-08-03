const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://sarang15mar:Sarang1234@cluster0.wrmoc7c.mongodb.net/abcd');

const db=mongoose.connection;


db.on('error',console.error.bind(console,'Error in connection DB'));


db.once('open',function(){
    console.log('Connected to DB');
});


module.exports=db;
