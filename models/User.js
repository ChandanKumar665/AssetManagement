const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema

const UserSchema = new Schema({
    fname:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true
    },
    doj:{
        type: Date,
        default: Date.now
    },
    is_active:{
        type: Boolean,
        default: true
    },
    is_admin:{
        type: Boolean,
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now
    },
    updated_date:{
        type: Date,
        default: Date.now
    }
})

//exporting model
module.exports = User = mongoose.model('users',UserSchema);