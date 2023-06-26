const express=require('express');
const passport = require('passport');
const router=express.Router();

const userController=require('../controllers/user_controller');

router.get('/signin',userController.signIn);
router.get('/signup',userController.signUp);

router.get('/profile',passport.checkAuthentication,userController.profile);

router.post('/create',userController.create);

router.post('/create-session',
    passport.authenticate(
        'local',
        { failureRedirect: '/users/signin' }
    ),userController.createSession);

router.get('/auth/google',
    passport.authenticate('google', 
    { scope:[ 'email', 'profile' ] }
));

router.get('/auth/google/callback',
    passport.authenticate( 'google', 
    { failureRedirect: '/users/signin' }),
    userController.createSession);

    
router.get('/signout',userController.destroySession);


router.use('/habits',require('./habits'));


module.exports=router;