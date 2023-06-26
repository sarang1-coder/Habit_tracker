const User=require('../models/users');
const Habit=require('../models/habit');
const moment = require('moment');

module.exports.signUp=function(req,res){

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('signup', {
        title: "Web-Page | SignUp Page"
    })

}

module.exports.signIn=function(req,res){
    
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('signin', {
        title: "Web-Page | SignIn Page"
    })

}

const getTodayDate=()=>{
    const today = moment().format('DD/MM/YYYY');
    return today;
}

function getOneWeekDate() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
        const d = moment().add(i, 'days');
        const formattedDate = d.format('DD/MM/YYYY');
        arr.push(formattedDate);
    }
    return arr;
}

module.exports.profile=async function(req,res){

    try{
        if (req.user) {

            let habits = await Habit.find({ userRef: req.user._id})    

            return res.render("profile", {
                title: "Web-Page | Profile Page",
                habits: habits,
                weeklyDate:await getOneWeekDate()
            });
        } 
        else 
        {  

            return res.redirect('/users/signin');
        }

    }catch(err){
        console.log("error");
        return;

    }
}

module.exports.create=async function(req,res){

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try{

        var user=await User.findOne({ email: req.body.email });

        if(!user)
        {
             await User.create(req.body);
             return res.redirect('/users/signin');
        }
        else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error',err);
        return; 

    }

}


module.exports.createSession = async function(req, res) {
    // try {
    //     const user = await User.findOne({ email: req.body.email });
    //     console.log(user);
    //     console.log(req.body);

    //     // Handle user found
    //     if (user) {
    //         // Handle password that doesn't match
    //         if (user.password !== req.body.password) {
    //             console.log(req.body.password);
    //             return res.redirect('back');
    //         }

    //         // Handle session creation
    //         res.cookie('user_id', user.id);
    //         console.log(req.cookies);

    //         return res.redirect('/users/profile');
    //     } else {
    //         console.log('User not found');
    //         // If user not found, return back
    //         return res.redirect('back');
    //     }
    // } catch (err) {
    //     console.log('Error in finding user in signing in');
    //     return;
    // }


    return res.redirect('/users/signin');
}


module.exports.destroySession = function(req, res,done) {
    // Clear the user's session
    // req.session.destroy(function(err) {
    //     if (err) {
    //         console.log('Error in destroying session:', err);
    //     }
    //     // Redirect the user to the login page
    //     return res.redirect('/users/signin');
    // });


    req.logout((err) => {
        if (err) {
            return done(err);
        }
    })
    return res.redirect('/users/signin');
};
