const mongoose=require('mongoose');


// Create Schema 
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
});


// Create Model 
const User=mongoose.model('User',userSchema);


module.exports=User;
