var express = require("express");
var app = express();

// "/" => "Hi there"
app.get("/", function(req,res){
    res.send("Hi There!");
})


// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
    res.send("Goodbye!!!");
})
// "/dog" => "Meow"
app.get("/dog", function(req, res) {
    res.send("Meow!");
})
app.get("/r/:subredditname", function(req, res) {
    var subreddit = req.params.subredditname;
    console.log(req.params);
    res.send("Welcome to " + subreddit + " subreddit");
})
app.get("/r/:subredditname/comments/:id/:title/", function(req, res) {
    console.log(req.params);
    res.send("Welcome to the comments page");
})
app.get("*", function(req, res) {
    res.send("That route is not defined   ");
})
app.listen(process.env.PORT, process.env.IP, function(){
    //start server
console.log("server has started!");
});