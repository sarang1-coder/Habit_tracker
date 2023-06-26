const User=require('../models/users');
const Habit=require('../models/habit');
const moment=require('moment');


function getTodayDate(){
    const today=moment().format('YYYY-MM-DD');
    return today;
}

module.exports.addHabits = async function(req, res) {
  try {
    let habit;
    try {
      let user;
      let id = req.user._id; 
      user = await User.findById(id); 
      habit = await Habit.findOne({ habitName: req.body.habit_name, userRef: req.user._id }).populate('userRef');
    } 
    catch (err) {
      console.log(err);
    }

    if (habit) {
      console.log("already exists");
    } else {
      let habits = await Habit.create({
        habitName: req.body.habit_name,
        userRef: req.user._id,
        habitDates: { date: await getTodayDate(), complete: "none" }
      });
    }

    req.flash("success", "Habit added successfully");
    return res.redirect('/users/profile');
  } catch (err) {
    console.log(err);
  }
}



module.exports.addFavHabits=async function(req,res){
    let id=req.query.id;
    let userId = req.user._id
    
    try{
    let habit = await Habit.findOne({
      _id: id,
      userRef: userId
    }).exec();

        habit.favouriteHabit = habit.favouriteHabit ? false : true;
        await habit.save();
        req.flash("success","Add to Favourite successfully");
        return res.redirect('back');

    }catch(err){
        console.log("Error in adding habit to favourite",err);
        return;
    }
}


module.exports.deleteHabits=async function(req,res){
    let id = req.query.id;
    let userId = req.user._id
    try{
        await Habit.deleteMany({
        _id: {
            $in: [id]
        },
        userRef: userId
    });

        req.flash("success","Habit Deleted successfully");
        return res.redirect('back');

    }
    catch(err)
    {
        console.log("Error in deleting Habits",err);
        return;
    }
}


module.exports.habitStatus=async function(req,res){

    let id=req.query.id;
    let date=req.query.date;

    try{
        
        let habit=await Habit.findById(id);

        let dates=habit.habitDates;
        let found=false;
        
        dates.find((item, index) => {
                if (item.date === date) {
                    if (item.complete === 'yes') {
                        item.complete = 'no';
                    }
                    else if (item.complete === 'no') {
                        item.complete = 'none'
                    }
                    else if (item.complete === 'none') {
                        item.complete = 'yes'
                    }
                    found = true;
                }
            })

        if (!found) 
        {
            dates.push({ date: date, complete: 'yes' })
        }
        habit.dates = dates;
        habit.save();

        return res.redirect("back");

    }
    catch(err){
        console.log("error",err);
        return;
    }
}


