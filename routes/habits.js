const express=require('express');
const router=express.Router();
const passport = require('passport');


const habitController=require('../controllers/habit_controller');


router.post('/addhabit',passport.checkAuthentication,habitController.addHabits);
router.get('/favorite-habit',habitController.addFavHabits);
router.get('/remove', habitController.deleteHabits);
router.get('/status-update', habitController.habitStatus);



module.exports=router;