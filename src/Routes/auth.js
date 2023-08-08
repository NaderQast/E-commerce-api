const express = require('express')
const router = express.Router();
const Crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/User')

router.post('/register', async(req ,res)=> {
    const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password: Crypto.AES.encrypt(req.body.password,process.env.SECRET).toString(),
    })
    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser) 
    }catch(err){
        res.status(500).send() 
    }
})

router.post("/login",async(req ,res) => {
    try{
        const user = await User.findOne({username:req.body.username })
        !user && res.status(401).json('wrong credentials !')
        
        const hashedPassword = Crypto.AES.decrypt(user.password, process.env.SECRET);
        const initPassword = hashedPassword.toString(Crypto.enc.Utf8)
        initPassword !== req.body.password && res.status(401).send('wrong credentials !')
        
        const accessToken = jwt.sign({id:user._id,
        isAdmin:user.isAdmin},process.env.JWT_SEC)


        const {password , ...others } = user._doc;
        
        res.status(201).json({...others, accessToken});
    }
    catch(err){
        res.status(500).send('error !')
    }
})


module.exports = router 