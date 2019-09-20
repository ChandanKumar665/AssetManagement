//login API
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../../middleware/auth')

//importing User model
const User = require('../../../models/User');

//@route POST api/auth
//@desc  authenticate an user
//@access Public
router.post('/',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.status(200).json({success:true,msg:'testing'});

    if(email ==  undefined || password == undefined){
        res.status(400).json({data:null,success:false,msg:'please fill all the fields.'})
    }

    User.findOne({email}).then(user => {
            if(!user){
                res.status(400).json({data:email,success:false,msg:'User does not exist.'})
            }
            try {
                //validate password    
                bcrypt.compare(password, user.password)
                .then(isMatched => {
                    if(!isMatched){
                        res.status(400).json({data:null,success:false,msg:'invalid password'})
                    } else {
                        jwt.sign(
                            {id:user.id},
                            config.get('jwtSecret'),
                            {expiresIn:3600},
                            (err,token) => {
                                if(err)
                                    throw err
                                res.status(200).json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.fname,
                                        email: user.email
                                    },
                                    success:true
                                })    
                            }
                        )
                    }       
                }).catch(err => res.status(500).json({data:null,success:false,msg:err}))
            } catch (error) {
                console.log(error)
            }
            
    }).catch(err => {
        res.status(500).json({data:null,success:false,msg:err})
    })
})

//@route GET api/auth/users
//@desc  Get all users
//@access Private
router.get('/user', authMiddleware, (req,res) => {
    User.findById(req.user.id).select('-password').then(users => {
        res.json({data:users,success:true,msg:'success'})
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
    })
})


module.exports = router;