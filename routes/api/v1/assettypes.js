const express = require('express')
const router = express.Router();

//importing AssetType model
const AssetType = require('../../../models/AssetType');

//@route GET api/users
//@desc  Get all users
//@access Public
router.get('/',(req,res) => {
    AssetType.find().sort({createdAt:-1}).then(assettype => {
        res.json({data:assettype,success:true,msg:'success'})
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})

//@route GET api/users/:id
//@desc  Get a single user
//@access Public
router.get('/:id',(req,res) => {
    var id = req.params.id;
    AssetType.findById(id).then(assettype => {
        res.json({data:assettype,success:true,msg:'success'})
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})




//@route POST api/users
//@desc  Create an user
//@access Public
router.post('/',(req,res) => {
    
    //creating Asset Type object
    const newAssetType = new AssetType({
        asset_type: req.body.asset_type,
        brand: req.body.brand
    })

    newAssetType.save().then(assettype => {
        res.json({data:assettype,success:true,msg:'Data saved successfully'})
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;