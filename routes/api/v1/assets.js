const express = require('express')
const router = express.Router();

//importing AssetType model
const Asset = require('../../../models/Asset');
const AssetType = require('../../../models/AssetType');

//@route GET api/users
//@desc  Get all users
//@access Public
router.get('/',async (req,res) => {
   await Asset.find().sort({createdAt:-1}).then(asset => {
        if(asset.length > 0){
            for(var i in asset){
                var id = asset[i].asset_type_id;
                // console.log(id)
                 AssetType.findById(id).then(assettype => {
                    asset[i].asset_type_name = assettype.asset_type
                }).catch(err => {
                    console.log(err)
                })
            }
            res.json({data:asset,success:true,msg:'success'})

        }else{
            res.json({data:null,success:true,msg:'no data'})
        }
        
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})

//@route GET api/users/:id
//@desc  Get a single user
//@access Public





//@route POST api/users
//@desc  Create an user
//@access Public
router.post('/',(req,res) => {
    
    //creating Asset Type object
    const newAsset = new Asset({
        asset_name: req.body.asset_name,
        asset_type_id: req.body.asset_type_id,
        model_no:req.body.model_no
    })

    newAsset.save().then(asset => {
        res.json({data:asset,success:true,msg:'Data saved successfully'})
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;