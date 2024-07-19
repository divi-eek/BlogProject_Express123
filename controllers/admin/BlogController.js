const CategoryModel = require("../../models/category");
const BlogModel = require("../../models/blog");

// for image
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "ddwlolvec",
  api_key: "453653465242666",
  api_secret: "ni1t4Fk16wpNT1y1Z5QVbq-7UYQ", // Click 'View Credentials' below to copy your API secret
});

class BlogController {
  static display = async (req, res) => {
    try {
const{name,image,role}=req.userdata
      const category = await CategoryModel.find();
      const blog = await BlogModel.find();

      res.render("admin/Blog/display", { c:category, b: blog,n:name,i:image,role:role});
    } catch (error) {
      console.log(error);
    }
  };

  static bloginsert = async (req, res) => {
    try {
    
      // console.log(req.files.image)
      const file = req.files.image;
      const uploadImage = await cloudinary.uploader.upload(
        file.tempFilePath,
        { timeout: 120000 },
        {
          folder: "blogImage",
        }
      );

     // console.log(uploadImage);

        const {category,title,description} = req.body
      const result=new BlogModel({
        category:category,
        title:title,
        description:description,
        image:{
          public_id:uploadImage.public_id,
          url:uploadImage.secure_url
        }
      })
      await result.save()
      res.redirect("/admin/blogDisplay")
    } catch (error) {
      console.log(error);
    }
  };

  static blogView=async(req,res)=>{
    try {
const{name,image,role}=req.userdata
        const id=req.params.id
        const view= await BlogModel.findById(id)
        // console.log(category)
        res.render('admin/Blog/view',{e:view,n:name,i:image,role:role})
    } catch (error) {
        console.log(error)
    }
  };

  static blogEdit=async(req,res)=>{
    try {      
const{name,image,role}=req.userdata

        const edit= await BlogModel.findById(req.params.id)
        const category=await CategoryModel.find()
        res.render('admin/Blog/edit',{e:edit,c:category,n:name,i:image,role:role})
    } catch (error) {
        console.log(error)
    }
}


  static blogDelete=async(req,res)=>{

    try {
const{name,image,role}=req.userdata

      await BlogModel.findByIdAndDelete(req.params.id)
      // req.flash('success','Blog deleted succesfully')
      res.redirect('/admin/blogDisplay')
      
    } catch (error) {
      console.log(error)
    }
  }

  static blogUpdate=async(req,res)=>{
    try {
    const{name,image,role}=req.userdata

      // console.log(req.body)
      // console.log(req.files.image)
      if(req.files)
      {
        const blog=await BlogModel.findById(req.params.id)
        const imageid=blog.image.public_id

        //console.log(imageid)
        await cloudinary.uploader.destroy(imageid)

        const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
          folder:'blogImage'
        })

        var data={
          title: req.body.title,
          description:req.body.description,
          image:{
            public_id:myimage.public_id,
            url:myimage.secure_url
          }
        }
      }
      else{
        var data={
          title:req.body.title,
          description:req.body.description
        }

      }

      const update=await BlogModel.findByIdAndUpdate(req.params.id,data)
      await update.save()

      res.redirect('/admin/blogDisplay')

    } catch (error) {
        console.log(error)  
    }
}
}

module.exports = BlogController;
