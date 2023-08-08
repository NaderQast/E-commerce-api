const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Crypto = require('crypto-js')
const {auth ,authRules} = require('./verifyToken')


router.post('/', auth ,async(req ,res) => {
    const newCart = new Product(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).send(savedCart)
    }catch(err){
        res.status(500).send()
    }
})





router.put('/:id', auth ,async(req ,res) => {

    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,{
            $set:req.body},
            {new:true})
        res.status(200).send(updatedCart)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete('/:id' , auth , async(req ,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).send('Product deleted !')
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get('/:userId', auth , async(req ,res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId})

        res.status(201).json(cart);
    }
    catch(err){
        res.status(500).send(err)
    }
})


router.get('/' , auth , async(req ,res) => {
    try{
        const carts = await Cart.find()
        res.status(201).json(carts);
    }
    catch(err){
        res.status(500).send(err)
    }
})




module.exports = router 