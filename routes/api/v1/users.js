const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../../middleware/auth');

//importing User model
const User = require('../../../models/User');

//@route GET api/users
//@desc  Get all users
//@access Public
router.get('/', auth, (req,res) => {
    User.find().sort({createdAt:-1}).then(users => {
        res.json({data:users,success:true,msg:'success'})
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})

//@route GET api/users/:id
//@desc  Get a single user
//@access Public
router.get('/:id', auth, (req,res) => {
    var id = req.params.id;
    User.findById(id).then(users => {
        res.status(200).json({data:users,success:true,msg:'success'})
    }).catch(err => {
        res.status(400).json({data:null,success:false,msg:err})
    })
})

//@route POST api/users
//@desc  Create an user
//@access Public
router.post('/', (req,res) => {
    //creating user object
    
    const newUser = new User({
        fname: req.body.fname,
        email: req.body.email,
        is_admin: req.body.is_admin ? true : false,
        password: req.body.password
    })
    
    if(req.body.fname == undefined || req.body.email ==  undefined || req.body.password == undefined){
        res.status(400).json({data:null,success:false,msg:'please fill all the fields.'})
    }

    User.findOne({email:req.body.email}).then(users => {
            if(users){
                res.status(400).json({data:users.email,success:false,msg:'Email is already exist.'})
            }else{
                //creating salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err)
                            console.log(err)
                        newUser.password = hash;
                        newUser.save().then(users => {
                           //creating token     
                           jwt.sign(
                               {id:users.id},
                               config.get('jwtSecret'),
                               {expiresIn:3600},
                               (err,token) => {
                                   if(err)
                                        throw err;
                                   res.status(200).json({
                                       token,
                                       user: {
                                           id: users.id,
                                           name: users.fname,
                                           email: users.email
                                       },
                                       success:true
                                   })     
                               }
                               )
                        }).catch(err => {
                            res.status(400).json({data:null,success:false,msg:err})
                        });    
                    })
                })
            }
    }).catch(err => {
        res.status(400).json({data:null,success:false,msg:err})
    })
    
})

//@route PUT api/users/:id
//@desc Update an user
//@access Private
router.put('/:id', auth, (req,res) => {
    var id = req.params.id;
    const newData = {
        fname:req.body.fname,
        email:req.body.email,
        is_admin: req.body.is_admin ? true : false
    }

    User.findById(id).then(user => {
        //checking email
        if(newData.email != user.email){
            User.findOne({email:newData.email}).then(checkUser => {
                if(checkUser){
                    res.status(400).json({data:checkUser.email,success:false,msg:'Email is already exist.'})
                }else{
                    User.findByIdAndUpdate(id,newData,{new:true}).select('-password').then(result => {
                        res.status(201).json({data:result,success:true,msg:'Data updated successfully.'})
                    }).catch(err => {
                                res.status(400).json({data:null,success:false,msg:err})
                        })
                }
            }).catch(err => {
                res.status(400).json({data:null,success:false,msg:err})
            })
        } else {
                User.findByIdAndUpdate(id,newData,{new:true}).then(result => {
                    res.status(201).json({data:result,success:true,msg:'Data updated successfully.'})
                }).catch(err => {
                    res.status(400).json({data:null,success:false,msg:err})
                })
            }
    }).catch(err => {
        res.status(400).json({data:null,success:false,msg:err})
    })
})

//@route DELETE api/users/:id
//@desc Delete an user
//@access Private
router.delete('/:id', auth, (req,res) => {
    var id = req.params.id;
    User.findById(id).then(user => {
        user.remove().then(result => {
            res.json({data:result,success:true,msg:'Data deleted successfully'})
        }).catch(err => {
            res.json({data:null,success:false,msg:err})
        })
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})

module.exports = router;