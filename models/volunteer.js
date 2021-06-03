var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var VolunteerSchema = new mongoose.Schema({
    volunteer_name: String,
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
    charity: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ngo"
        },
    },
    contact: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    }
});

VolunteerSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("Volunteer",VolunteerSchema);
