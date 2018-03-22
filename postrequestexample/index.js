var express = require("express");
var BodyParser = require("body-parser");
var app = express();

app.use(BodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = ["Gel", "Rae", "Marco", "Daryl", "Erold"];

app.get("/", function(req, res){
    res.render("home");
})

app.post("/addfriend", function(req, res){
    var newfriend = req.body.friendname;
    friends.push(newfriend);
    res.redirect("friends");

})

app.get("/friends", function(req, res) {
    res.render("friends", {friends:friends});
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Connected");
});