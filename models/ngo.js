var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var NgoSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        validate:{
            validator: function(v){
                return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    description: String,
    regNo: String,
    contact: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    image:String,
    qr:String,
});

NgoSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("Ngo",NgoSchema);
