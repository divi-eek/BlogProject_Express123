const CategoryModel=require('../../models/category')

class CategoryController{
    static display=async(req,res)=>{
        try {
            const{name,image,role}=req.userdata
            const category= await CategoryModel.find()
            // console.log(category)
            res.render('admin/category/display',{c:category,n:name,i:image,role:role,msg:req.flash('success')})
        } catch (error) {
            console.log(error)
        }
    }

    static categoryInsert=async(req,res)=>{
        try {
        //    console.log(req.body) nput name(n)
        const result=new CategoryModel({
            name:req.body.n
        })
        await result.save()
        req.flash('success','Category Inserted')
        res.redirect('/admin/categoryDisplay')
        } catch (error) {
             console.log(error)
        }
    }

    static categoryView=async(req,res)=>{
        try {
            const{name,image,role}=req.userdata

            const id=req.params.id
            const view= await CategoryModel.findById(id)
            // console.log(category)
            res.render('admin/category/view',{v:view,n:name,i:image,role:role})
        } catch (error) {
            console.log(error)
        }
    }

    static categoryDelete=async(req,res)=>{
        try {
            
            await CategoryModel.findByIdAndDelete(req.params.id)
            req.flash('success','Category succesfully deleted')
            res.redirect('/admin/categoryDisplay')

        } catch (error) {
            console.log(error)
        }
    }

    static categoryEdit=async(req,res)=>{
        try {
            const{name,image,role}=req.userdata
            
            const edit= await CategoryModel.findById(req.params.id)
            
            // console.log(category)
            res.render('admin/category/edit',{e:edit,n:name,i:image,role:role})
        } catch (error) {
            console.log(error)
        }
    }

    static categoryUpdate=async(req,res)=>{
        try {

            
            await CategoryModel.findByIdAndUpdate(req.params.id,{name:req.body.n})

            req.flash('success','Category succesfully updated')
            res.redirect('/admin/categoryDisplay')
        } catch (error) {
            console.log(error)  
        }
    }

}

module.exports=CategoryController