var express = require("express");
var app = express();

// "/" => Welcome to assignment
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

// "/speak/pig" => Pig says
app.get("/speak/:animal/", function(req, res){
    var animal = req.params.animal.toLowerCase();
    var speak = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof"
    }
    
    res.send("The " + animal + " says '" + speak[animal] + "'");

});


// "/repeat/hello/3" should print "hello hello hello"
app.get("/repeat/:word/:frequency/", function(req, res) {
    var word = req.params.word;
    var freq = Number(req.params.frequency);
    var result = "";
    
    for (var i = 0; i<freq; i++){
        result += word + " ";
    }
    
    res.send(result);

    
    
});

// any other pages
app.get("*", function(req, res) {
    res.send("Page not found");
})

//start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});

