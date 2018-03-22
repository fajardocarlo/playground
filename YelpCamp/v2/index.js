var express     = require("express"),
    app         = express(),
    BodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(BodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
    name: "Salmon Creek", 
    image: "http://photosforclass.com/download/4684194306"
}, function(err, campgrounds){
    if (err) {
        console.log("Something went wrong");
        console.log(err);
    } else {
        console.log("Saved");
        console.log(campgrounds)
    }
})


app.get("/", function(req, res){
    res.render("home");
});
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allcamps){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {allcamps: allcamps})
        }
    })
    // res.render("campgrounds", {campgrounds:campgrounds});
});
app.post("/campgrounds", function(req, res){
    var campname = req.body.campname;
    var imagesource = req.body.imagesource;
    var newcampground = {name: campname, image: imagesource}
    Campground.create(newcampground, function(err, posted){
        if (err) {
            console.log(err);
        } else {
            console.log("successfully added");
        }
    })
    res.redirect("/campgrounds");
})
app.get("/campgrounds/new", function(req, res) {
    res.render("addCamp");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started");
});