const express=require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// include sassMiddleware
const sassMiddleware = require('node-sass-middleware');

// Create express app 
const app=express();
require('dotenv').config();

// Port Number 
const port=501;

const moment = require('moment'); 

const expressEjsLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');

const expressSession=require('express-session');
const MongoStore = require('connect-mongo');

const flash=require('connect-flash');
const customWare=require('./config/middleware');

const bodyParser = require('body-parser');


const passport = require('passport');
require('./config/passport-local-Strategy');
const passprtGoogle=require('./config/passport-google-auth');

app.use(bodyParser.urlencoded({ extended: false }));



moment().format(); 





app.use(sassMiddleware({
  src: path.join(__dirname, './assets/sass'),
  dest: path.join(__dirname, './assets/css'),
  debug: false,
  outputStyle: 'compressed',
  prefix:  '/css' 
}));



app.use(express.urlencoded());
app.use(cookieParser());



// use expressEjsLayouts
app.use(expressEjsLayouts);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// Set View Engine
app.set('view engine','ejs');
app.set('views','./views');




// use static files 
app.use(express.static('./assets'));




//Use express-session
app.use(expressSession({
    name:'habitTracker',
    secret:'habitTracker_app',
    cookie:{
        maxAge:(24*60*60*1000)
    },
    store:MongoStore.create({
        mongoUrl: "mongodb://localhost/Habit_tracker_app"
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());

app.use(customWare.setFlash);


// Use Router 
app.use('/',require('./routes/index.js'));



// check running .. 
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 
