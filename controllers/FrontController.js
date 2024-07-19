const BlogModel=require('../models/blog')
const CategoryModel = require('../models/category')
const UserModel = require('../models/user')
class FrontController{
    static home=async(req,res)=>{

        try {
        //    res.send("Home Page")
        const blog=await BlogModel.find()
        //console.log(blog)
           res.render('home',{b:blog})
        } catch (error) {
            console.log(error)
        }
    }

    static about=async(req,res)=>{

        try {
            res.render('about')
        } catch (error) {
            console.log(error)
        }
    }

    static contact=async(req,res)=>{
        
        try {
            res.render("contact")
        } catch (error) {
            console.log("error")
        }
    }

    static bloglist=async(req,res)=>{
        
        try {
            const blog=await BlogModel.find()
            res.render("bloglist",{b:blog})
        } catch (error) {
            console.log("error")
        }
    }

    static login=async(req,res)=>{
        try {
            res.render("login",{msg1:req.flash('success'),msg2:req.flash("error")})
        } catch (error) {
            console.log("error")
        }
    }

    static blogDetails=async(req,res)=>{
       try {
        // console.log(req.params.id) //id get
        const id=req.params.id
        const details=await BlogModel.findById(id)
        const Recentblog=await BlogModel.find()
        const category=await CategoryModel.find()

        // console.log(details)
        res.render("blogDetails",{d:details,r:Recentblog,c:category})
       } catch (error) {
        console.log(error)
       }
    }

    static signin=async(req,res)=>{
        try {
            res.render("signin",{msg:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }

    static logout=async(req,res)=>{
        try {
            res.clearCookie('token')
           res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }

    static blogCat=async(req,res)=>{
        try {
            const id=req.params.id
            //console.log(id)
            const blogcat=await BlogModel.find({category:id})
            // console.log(blogcat)

            res.render("blogcat",{bc:blogcat})
            
        } catch (error) {
            console.log(error)
        }
    }


    static verifyMail=async(req,res)=>{
        try {
           const updateinfo=await UserModel.findByIdAndUpdate(req.query.id,{
            is_verified:1,
           })

           if(updateinfo)
           {
            res.redirect("/")
           }
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports=FrontController