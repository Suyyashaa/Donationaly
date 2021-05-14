var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var NgoSchema = new mongoose.Schema({
    donor_name: String,
    donor_email: String,
    donor_phone: String,
    donor_address: String,
    amount: Number,
    donor_pan: String,
    donation_user:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    },
});

NgoSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("Donation",NgoSchema);
