const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Crypto = require('crypto-js')
const {auth ,authRules} = require('./verifyToken')


router.post('/', authRules ,async(req ,res) => {
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save()
        res.status(200).send(savedProduct)
    }catch(err){
        res.status(500).send()
    }
})





router.put('/:id', authRules ,async(req ,res) => {

    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,{
            $set:req.body},
            {new:true})
        res.status(200).send(updatedProduct)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete('/:id' , authRules , async(req ,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send('Product deleted !')
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get('/:id', async(req ,res) => {
    try{
        const product = await User.findById(req.params.id)

        res.status(201).json(product);
    }
    catch(err){
        res.status(500).send(err)
    }
})


router.get('/' ,  async(req ,res) => {
    const querryNew = req.query.new
    const querryCategory = req.query.category 

    try{
        let products ;
        if(querryNew){
            products = await Product.find().sort({createdAt: -1}).limit(3)
        }else if(querryCategory){
            products = await Product.find({categories:{
                $in:[querryCategory]
            },
        })
        }else{
            products = await Product.find()
        }        
        res.status(201).json(products);
    }
    catch(err){
        res.status(500).send(err)
    }
})




module.exports = router 