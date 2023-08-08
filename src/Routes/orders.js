const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Crypto = require('crypto-js')
const {auth ,authRules} = require('./verifyToken')


router.post('/', auth ,async(req ,res) => {
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save()
        res.status(200).send(savedOrder)
    }catch(err){
        res.status(500).send()
    }
})





router.put('/:id', authRules ,async(req ,res) => {

    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,{
            $set:req.body},
            {new:true})
        res.status(200).send(updatedOrder)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete('/:id' , authRules , async(req ,res) => {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).send('Product deleted !')
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get('/:userId', auth , async(req ,res) => {
    try{
        const orders = await Order.find({userId: req.params.userId})

        res.status(201).json(orders);
    }
    catch(err){
        res.status(500).send(err)
    }
})


router.get('/' , authRules , async(req ,res) => {
    try{
        const orders = await Order.find()
        res.status(201).json(orders);
    }
    catch(err){
        res.status(500).send(err)
    }
})




module.exports = router 