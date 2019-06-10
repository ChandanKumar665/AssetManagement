const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const AssetSchema = new Schema({
    asset_name:{
        type: String,
        required: true
    },
    asset_type_id:{
        type: BigInt,
        required: true
    },
    assigned_to:{
        type: BigInt,
        required: true
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
module.exports = Asset = mongoose.model('asset',AssetSchema); 