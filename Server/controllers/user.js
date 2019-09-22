//controller
let express = require('express');
const bodyParser = require('body-parser');
let router = express.Router();
router.use(bodyParser.json());


const User = require('../models/User');
const passport = require("passport");
const _ = require('lodash');
const bcrypt =  require('bcrypt');




module.exports.userPrifile = (req,res,next)=>{
    User.findOne({_id:req._id}, (err,user)=>{
        if (err)
            return req.status(404).json( {status:false, massage: 'User record not found' } );
        else {
            return res.status(200).json({status:true,user:_.pick(user,['name','email'])});
        }
    });
};

module.exports.userLogin =  (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({"token" : user.generateJwt()});
        else return res.status(404).json(info);
    })(req,res);
};

module.exports.userRegister = (req,res,next) =>{
    let user = req.body;
    new Promise((resolve, reject) => {
        bcrypt.genSalt(10,(err,salt) =>{
            bcrypt.hash(user.password,salt,(err,hash) =>{
                if (err){
                    reject(err);
                }else {
                    user.password = hash;
                    resolve(user);
                }
            } )
        } )
    }).then(user =>{
        return User.create(user);
    })
        .then(user => {
            console.log('user created', user.name, user.email);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ id: user._id, name: user.name, email: user.email });
        }).catch(err => {
        if (err.code === 11000){
            res.status(422).send(['Duplicate email address found']);
        }else {
            next(err);
        }
    });
};

