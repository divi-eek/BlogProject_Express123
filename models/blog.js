const mongoose=require('mongoose')

const BlogSchema=mongoose.Schema({

    category:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       
    },

    status:{
        type:String,
        default:"0"

    }
},{timestamps:true})

const BlogModel=mongoose.model('blog',BlogSchema)
module.exports=BlogModel    