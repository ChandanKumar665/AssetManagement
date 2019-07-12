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
    if(email ==  undefined || password == undefined){
        res.status(400).json({data:null,success:false,msg:'please fill all the fields.'})
    }

    User.findOne({email}).then(user => {
            if(!user)
                res.status(400).json({data:email,success:false,msg:'User does not exist.'})
            //validate the password
            bcrypt.compare(password, user.password)
            .then(isMatched => {
                if(!isMatched)
                    res.status(400).json({data:null,success:false,msg:'invalid password'})
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
            }).catch(err => res.json({data:null,success:false,msg:err}))        
    }).catch(err => {
        res.json({data:null,success:false,msg:err})
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


//@route PUT api/users/:id
//@desc Update an user
//@access Public
// router.put('/:id',(req,res) => {
//     var id = req.params.id;
//     const newData = {
//         fname:req.body.fname,
//         email:req.body.email,
//         is_admin: req.body.is_admin ? true : false
//     }

//     User.findById(id).then(user => {
//         //checking email
//         if(newData.email != user.email){
//             User.findOne({email:newData.email}).then(checkUser => {
//                 // console.log(checkUser)
//                 if(checkUser){
//                     res.json({data:checkUser.email,success:false,msg:'Email is already exist.'})
//                 }else{
//                     // console.log(newData)
//                     User.findByIdAndUpdate(id,newData,{new:true}).then(result => {
//                         res.json({data:result,success:true,msg:'Data updated successfully.'})
//                     }).catch(err => {
//                                 res.json({data:null,success:false,msg:err})
//                         })
//                 }
//             }).catch(err => {
//                 res.json({data:null,success:false,msg:err})
//             })
//         }else{
//             User.findByIdAndUpdate(id,newData,{new:true}).then(result => {
//                 res.json({data:result,success:true,msg:'Data updated successfully.'})
//             }).catch(err => {
//                         res.json({data:null,success:false,msg:err})
//                 })
//         }
//     }).catch(err => {
//                 res.json({data:null,success:false,msg:err})
//         })
// })

//@route DELETE api/users/:id
//@desc Delete an user
//@access Private
router.delete('/:id',(req,res) => {
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