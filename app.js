const express=require('express')
//console.log(e)
const app=express()
const port=3000

const web=require('./routes/web')

const connect=require('./Db/connectDB')
// const fileupload=require('express-fileupload')
const fileUpload = require('express-fileupload')

app.use(fileUpload({useTempFiles:true}))

//connect flash and session( for showing message)
const session=require('express-session')
const flash=require('connect-flash')
var cookieParser = require('cookie-parser')

app.use(cookieParser())

//message
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}))

//Flash message
app.use(flash())


//for securing password in mongoDb
const bcrypt=require("bcrypt")

//dbconnect
connect()

//data get converts into object
app.use(express.urlencoded({extended:false}))


//html css template engines 
app.set('view engine','ejs')

//link css image
app.use(express.static('Public'))

//route load
app.use('/',web)


//create server
app.listen(port,()=>console.log("server start localhost:3000"))
