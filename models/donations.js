var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var NgoSchema = new mongoose.Schema({
    donor_name: String,
    donor_email: {
        type: String,
        validate:{
            validator: function(v){
                return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    donor_phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    donor_address: String,
    amount: Number,
    donor_pan: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
            },
            message: '{VALUE} is not a valid Pan-number!'
        }
    },
    donation_user:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    },
    donation_ngo:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ngo"
        },
    },
});

NgoSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("Donation",NgoSchema);
