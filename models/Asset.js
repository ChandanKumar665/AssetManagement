const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

//creating schema
const AssetSchema = new Schema({
    asset_name:{
        type: String,
        required: true
    },
    model_no:{
        type:String,
        required:true
    },
    asset_type_id:{
      type: String,
      required: true  
    }
    },
    {
        timestamps: true
    }
    )

//exporting model
module.exports = Asset = mongoose.model('assets',AssetSchema); 