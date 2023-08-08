const express = require('express')
const User = require('../models/User')
const router = express.Router()
const Crypto = require('crypto-js')
const {auth ,authRules} = require('./verifyToken')


router.put('/:id', auth ,async(req ,res) => {
    if(req.body.password){
        req.body.password = Crypto.AES.encrypt
        (req.body.password,process.env.SECRET)
        .toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body},
            {new:true})
        res.status(200).send(updatedUser)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete('/:id' , auth , async(req ,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('user deleted !')
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get('/:id' , authRules, async(req ,res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password , ...others } = user._doc;
        
        res.status(201).json({...others});
    }
    catch(err){
        res.status(500).send(err)
    }
})


router.get('/' , authRules, async(req ,res) => {
    const query = req.query.new
    try{
        const users = query 
       ? await User.find().sort({ _id: -1}).limit(2)
       : await User.find()        
        res.status(201).json(users);
    }
    catch(err){
        res.status(500).send(err)
    }
})













module.exports = router 