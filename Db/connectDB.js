const mongoose= require('mongoose')

const localUrl="mongodb://127.0.0.1:27017/blogProject"
const liveUrl ="mongodb+srv://pn123:pn123@cluster0.ygpytkl.mongodb.net/blogproject?retryWrites=true&w=majority&appName=Cluster0"

const connect=()=>{
    mongoose.connect(localUrl).then(()=>{
        console.log('connect success')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports=connect

