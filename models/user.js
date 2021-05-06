var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        validate:{
            validator: function(v){
                return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    contactno: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    dob: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$/.test(v);
            },
            message: '{VALUE} is not a valid Date!'
        }
    },
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);