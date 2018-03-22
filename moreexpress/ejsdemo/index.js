var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.send("Welcome to the homepage");
});
app.get("/home/:user", function(req, res){
    var username = req.params.user;
    
    res.render("home.ejs", {userName: username});
});
app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Ben"},
        {title: "Post 2", author: "Hans"},
        {title: "Post 3", author: "Art"}
        ];
    
    res.render("posts.ejs", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER RUNNING"); 
});