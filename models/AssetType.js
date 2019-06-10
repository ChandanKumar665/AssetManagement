const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

//creating schema
const AssetTypeSchema = new Schema({
    asset_type_name:{
        type: String,
        required: true
    },
    brand:{
      type: String,
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
module.exports = AssetType = mongoose.model('asset',AssetTypeSchema); 