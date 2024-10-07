//create http server
//import express module
const exp = require('express')
const {MongoClient}=require('mongodb')
const app=exp()
const cors=require('cors')

app.use(cors({
    origin:'*'
}))

require('dotenv').config()

let mClient=new MongoClient(process.env.DB_URL)
mClient.connect()
.then((connectobj)=>{
    const pvpdb=connectobj.db('pvpdb')
    const userCollection=pvpdb.collection('users')
    const prodCollection=pvpdb.collection('products')
    app.set('userCollection',userCollection)
    app.set('prodCollection',prodCollection)
    console.log('Db connection success');
    //assign port number to http server of express app
    app.listen(process.env.PORT,()=>console.log('http server started on port 3100'))
})
.catch((err)=>console.log('error in connecting',err))

const userApp=require('./APIs/userApi')
const prodApp=require('./APIs/productsApi')
app.use('/user-api',userApp)

app.use('/product-api',prodApp)

app.use('*',(req,res,next)=>{
    console.log(res);
    res.send({message:`Invalid path ${req.url}`})
})

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:'error occured',errorMsg:err})
})