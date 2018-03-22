var faker = require("faker");



console.log("=========================");
console.log("WELCOME TO MY SHOP!")
console.log("=========================");

for(var i =0 ; i<10 ; i++) {
var randomproductname = faker.commerce.productName();
var randomprices = faker.commerce.price();
console.log(randomproductname + " - $" + randomprices);
}