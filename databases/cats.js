var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

//addm new cat to db
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

/*var george = new Cat({
    name: "Mrs. Norris",
    age: "7",
    temperament: "Grouchy"
});
george.save(function(err, cat){
    if(err) {
        console.log("Something went wrong");
    } else {
        console.log("Saved");
        console.log(cat);
    }
});*/
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cats){
    if (err){
        console.log("Something went wrong");
    } else {
        console.log(cats);
    }
})

//retreive cat from db
Cat.find({}, function(err, cats){
    if(err){
        console.log("Something went wrong");
        console.log(err);
    } else {
        console.log(cats);
    }
})