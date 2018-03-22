var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/authdemo");

var app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "rusty is the best",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);
passport.use(new localStrategy(User.authenticate()));


//================
//ROUTES
//================

app.get("/", function(req, res){
    res.render("home");
});
app.get("/secret", function(req, res){
    res.render("secret");
});
app.get("/register", function(req, res) {
    res.render("register");
});
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register");
      }  
      passport.authenticate("local")(req,res, function(){
          res.redirect("/secret")
      })
    })
});
app.get("/login", function(req, res) {
    res.render("login")
});
// LOGIN LOGIC
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER RUNNING");
});