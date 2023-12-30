const mongoose = require('mongoose');
const userData = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    phone:{
        type: String,
        require: true,
        unique: true
    },
    account_type:{
        type: String,
        default: 'customer'
    },
    password:{
        type: String,
        require: true
    }
});
module.exports = mongoose.model('users', userData);