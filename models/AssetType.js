const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

//creating schema
const AssetTypeSchema = new Schema({
    asset_type:{
        type: String,
        required: true
    },
    brand:{
      type: String,
      required: true  
    }
    },
    {
        timestamps: true
    }
    )

//exporting model
module.exports = AssetType = mongoose.model('asset_types',AssetTypeSchema); 