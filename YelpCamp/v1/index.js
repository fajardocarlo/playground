var express = require("express");
var app = express();
var BodyParser = require("body-parser");
app.use(BodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var campgrounds =[
            {name: "Salmon Creek", image: "http://photosforclass.com/download/4684194306"},
            {name: "Granite Hills", image: "http://photosforclass.com/download/3694344957"},
            {name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/5641024448"}
        ]

app.get("/", function(req, res){
    res.render("home");
});
app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds:campgrounds});
});
app.post("/campgrounds", function(req, res){
    var campname = req.body.campname;
    var imagesource = req.body.imagesource;
    var newcampground = {name: campname, image: imagesource}
    campgrounds.push(newcampground);
    res.redirect("/campgrounds");
})
app.get("/campgrounds/new", function(req, res) {
    res.render("addCamp");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started");
});