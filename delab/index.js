var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/delab");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

   //db schema
var jobOrderSchema = new mongoose.Schema({
    
    customerInformation: {
    
        customerName: String,
        customerDesignation: String,
        schoolCompany: String,
        contactNumber: String,
        emailAddress: String,
        howdidyoufindus: String
    
    },
    
    projectInformation: {
        
        projectTitle: String,
        deadline: {type: Date},
        pickup: {type: Date},
        initialBudget: Number,
        scale: String,
        guidelines: String,
        withBase: String
    },
    
    projectDocumentation: {
        
        modelling: {
            modellingPersonInCharge: String,
            modellingTaskHead: String,
            modellingHours: Number,
            modellingCost: Number
        },
        
        layout: {
            layoutPersonInCharge: String,
            layoutTaskHead: String,
            layoutHours: Number,
            layoutCost: Number
        },
        
        cutting: {
            cuttingPersonInCharge: String,
            cuttingTaskHead: String,
            cuttingHours: Number,
            cuttingCost: Number
        },
        
        assembly: {
            assemblyPersonInCharge: String,
            assemblyTaskHead: String,
            assemblyHours: Number,
            assemblyCost: Number
        },
        
        totalProductionCost: Number,
        internsCommission: Number
        
    },
    
    materialDocumentation: {
        materialTypeUsed: {type: [String], default: undefined},
        numberOfPieces: {type: [Number], default: undefined},
        totalMaterialCost: Number
    },
    materialInventory: {
        materialName: String,
        materialQuantity: Number
    },
    
    projectSummary: {
        totalCuttingCost: Number,
        startupFee: Number,
        contractPrice: Number,
        downpayment: Number,
        balance: Number,
        
    }
    
    
    
});

var JobOrder = mongoose.model("JobOrder", jobOrderSchema);



app.get("/", function(req, res){
    res.render("delabLogin");
});
app.get("/jobOrder", function(req, res){
    res.render("jobOrder");
});
app.post("/jobOrder", function(req, res){
    var newcustomerName = req.body.customerName
    var newschoolCompany = req.body.schoolCompany
    var newcontactNumber = req.body.contactNumber
    var newemailAddress = req.body.emailAddress
    var newhowdidyoufindus = req.body.howdidyoufindus
    var newprojectTitle = req.body.projectTitle
    var newdeadline = req.body.deadline
    var newpickup = req.body.pickup
    var newinitialBudget = req.body.initialBudget
    var newscale = req.body.scale
    var newguidelines = req.body.guidelines
    var newwithBase = req.body.withBase

    var saveJob = {
        customerInformation: {
        customerName: newcustomerName, 
        schoolCompany: newschoolCompany,
        contactNumber: newcontactNumber,
        emailAddress: newemailAddress,
        howdidyoufindus: newhowdidyoufindus
        },
        
        projectInformation: {
        projectTitle: newprojectTitle,
        deadline: newdeadline,
        pickup: newpickup,
        initialBudget: newinitialBudget,
        scale: newscale,
        guidelines: newguidelines,
        withBase: newwithBase
        },
    }
    JobOrder.create(saveJob, function(err, saved){
        if(err) {
            console.log(err);
        } else {
            console.log(saved);
        }
    })
    res.redirect("jobOrder");
});

app.get("/materials/new", function(req, res) {
    res.render("addMaterial");
});

app.post("/materials/new", function(req,res) {
    var newMaterialName = req.body.materialName;
    var newMaterialQuantity = req.body.materialQuantity;
    var addMaterial = {
        materialInventory: {
            materialName: newMaterialName,
            materialQuantity: newMaterialQuantity
        }
    };
    JobOrder.create(addMaterial, function(err, saved){
        if(err) {
            console.log(err);
        } else {
            console.log(saved);
        }
    });
    res.redirect("/materials/new");
});

app.get("/display", function(req, res) {
    JobOrder.find({},function(err, data){
        if(err){
            console.log(err);
        } else {
            res.render("display", {data : data});
        }
    })
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Connected");
})