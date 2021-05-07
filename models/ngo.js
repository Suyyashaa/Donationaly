var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var NgoSchema = new mongoose.Schema({
    name: String,
    email: String,
    
    description: String,
    regNo: String,
    contact: Number
});

NgoSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("Ngo",NgoSchema);
