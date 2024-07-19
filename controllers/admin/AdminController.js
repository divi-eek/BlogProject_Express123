class AdminController{

    static dashboard=async(req,res)=>{
        try {
            const{name,image,role}=req.userdata
            res.render('admin/dashboard',{n:name,i:image,role:role})
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports=AdminController