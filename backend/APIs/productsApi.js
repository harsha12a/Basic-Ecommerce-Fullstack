let exp=require('express')
let prodApp=exp.Router()
const expressAsyncHandler = require('express-async-handler');
prodApp.use(exp.json())
const tokenVerify=require('../middlewares/tokenVerify.js');

//prodApp.get('/products',(req,res)=>{
//    res.send({message:'All products'})
//})
//
//prodApp.get('/products/:id',(req,res)=>{
//    let idUrl=Number(req.params.id)
//    let productId=lst.find((product)=>product.id===idUrl)
//    if(productId===undefined){
//        res.send({message:'product not found'})
//    }
//    else{
//        res.send({message:'product found',payload:productId})
//    }
//})
//
//prodApp.post('/produts',(req,res)=>{
//    let re=req.body
//    lst.push(re)
//    res.send({message:"New product created"})
//})
//
//prodApp.put('/products',(req,res)=>{
//    let modifiedproduct=req.body
//    let existproduct=lst.findIndex((product)=>product.id===modifiedproduct.id)
//    if(existproduct===-1){
//        res.send({message:"product not found"})
//    }
//    else{
//        lst[existproduct]=modifiedproduct
//        res.send({message:"product updated"})
//    }
//})
//
//prodApp.delete('/products/:id',(req,res)=>{
//    let idUrl=Number(req.params.id)
//    let exproduct=lst.findIndex((product)=>product.id===idUrl)
//    if(exproduct===-1){
//        res.send({message:"product not found"})
//    }
//    else{
//        lst.splice(exproduct,1)
//        res.send({message:"product deleted"})
//    }
//})


prodApp.get('/products',expressAsyncHandler(async(req,res)=>{
    let prodCollection=req.app.get('prodCollection')
    let prods=await prodCollection.find().toArray()
    res.send({message:'all products',payload:prods})
}))

prodApp.get('/products/:id',expressAsyncHandler(async (req,res)=>{
    let prodCollection=req.app.get('prodCollection')
    let idurl=Number(req.params.id)
    let dbUser=await prodCollection.findOne({id:{$eq:idurl}})
    if(dbUser===null){
        res.send({message:'product not found'})
    }
    else{
        res.send({message:'product found',payload:dbUser})
    }
}))



module.exports=prodApp