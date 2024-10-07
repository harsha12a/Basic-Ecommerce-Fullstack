let exp=require('express')
let userApp=exp.Router()
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
userApp.use(exp.json())
const tokenVerify=require('../middlewares/tokenVerify.js');
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config()


//create sample rest api(req handlers routes)
 //route for get users(protected route)
userApp.get('/users',tokenVerify,expressAsyncHandler(async (req,res)=>{
    const userCollection=req.app.get('userCollection')
    let users=await userCollection.find().toArray()
    res.send({message:"all users",payload:users})
}))


//route for user with id(protected route)
userApp.get('/users/:username',tokenVerify,expressAsyncHandler(async (req,res)=>{
    const userCollection=req.app.get('userCollection')
    const nameurl=req.params.username
    let user=await userCollection.findOne({username:{$eq:nameurl}})
    res.send({message:'one user',payload:user})
}))


//route for posting users(public route)
userApp.post('/user',expressAsyncHandler(async (req,res)=>{
    const userCollection=req.app.get('userCollection')
    const newUser=req.body
    let extUser=await userCollection.findOne({username:newUser.username})
    if(extUser!==null){
        res.send({message:"User already exists"})
    }
    else{
        let hashed=await bcrypt.hash(newUser.password,7)
        newUser.password=hashed

        newUser.products=[]

        //replace pass with hashed pass
        await userCollection.insertOne(newUser)
        res.send({message:"New user created"})
    }
}))

//user login(public route)
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    let userCollection=req.app.get('userCollection')
    let userCred=req.body
    let dbuser=await userCollection.findOne({username:userCred.username})
    if(dbuser===null){
        res.send({message:"Invalid username"})
    }
    else{
        let result=await bcrypt.compare(userCred.password,dbuser.password)
        if(result===false){
            res.send({message:"Invalid password"})
        }
        else{
            //create jwt token
            let signedToken=jwt.sign({username:userCred.username},process.env.SECRET_KEY,{expiresIn:'10hr'})
            //send res
            res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
}))

//route for put user
userApp.put('/updation',tokenVerify,expressAsyncHandler(async (req,res)=>{
    let userCollection=req.app.get('userCollection')
    let modifiedUser=req.body.update
    let nameUrl=req.body.name
    let exist=await userCollection.findOne({username:nameUrl})
    if(exist===null){
        res.send({message:"User not found"})
    }
    else{
        await userCollection.updateOne({username:nameUrl},{$set:{...modifiedUser}})
        res.send({message:"User updated"})
    }
}))

//route for delete
userApp.delete('/users/:username',tokenVerify,(req,res)=>{
    let userCollection=req.app.get('userCollection')
    let nameurl=req.params.username
    let exist=userCollection.findOne({username:nameurl})
    if(exist===null){
        res.send({message:"User not found"})
    }
    else{
        userCollection.deleteOne({username:nameurl})
        res.send({message:"User deleted"})
    }
})


userApp.put('/addToCart/:username',tokenVerify,expressAsyncHandler(async(req,res)=>{
    let userCollection=req.app.get('userCollection')
    let nameUrl=req.params.username

    let prodObj=req.body
    let result=await userCollection.updateOne({username:{$eq:nameUrl}},{$addToSet:{products:prodObj}})
    res.send({message:"product added to cart",payload:result})
}))

userApp.get('/cart/:username',tokenVerify,expressAsyncHandler(async(req,res)=>{
    let userCollection=req.app.get('userCollection')
    let userUrl=req.params.username
    let result=await userCollection.findOne({username:{$eq:userUrl}})
    res.send({message:"user cart",payload:result})

}))

userApp.put('/removeCart/:id',tokenVerify,expressAsyncHandler(async(req,res)=>{
    let userCollection=req.app.get('userCollection')
    let idUrl=Number(req.params.id)
    let nameUrl=req.body.username
    await userCollection.updateOne({username:nameUrl},{$pull:{products:{id:idUrl}}})
    let result=await userCollection.findOne({username:nameUrl})
    res.send({message:"product removed from cart",payload:result})
}))

module.exports=userApp;