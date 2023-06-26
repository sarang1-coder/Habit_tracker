const express=require('express');
const router=express.Router();


console.log('Router is running');




router.use('/users', require('./users'));





module.exports=router;