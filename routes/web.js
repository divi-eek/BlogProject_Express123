const express= require('express')
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const CategoryController = require('../controllers/admin/CategoryController')
const BlogController = require('../controllers/admin/BlogController')
const UserController = require('../controllers/UserController')
const checkAuth=require('../middleware/Auth')

//./ means ek baar file ke bahar  ../ means 2 baar bahar aana hai 
const route=express.Router()



//to controller

route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/contact',FrontController.contact)
route.get('/bloglist',FrontController.bloglist)
route.get('/login',FrontController.login)
route.get('/details/:id',FrontController.blogDetails)
route.get('/signin',FrontController.signin)
route.get('/blogCat/:id',FrontController.blogCat)




//admin
route.get('/admin/dashboard',checkAuth,AdminController.dashboard)
route.get('/logout',FrontController.logout)

//display categories
route.get('/admin/categoryDisplay',checkAuth,CategoryController.display)
route.post('/admin/categoryInsert',checkAuth,CategoryController.categoryInsert)
route.get('/admin/categoryView/:id',checkAuth,CategoryController.categoryView)
route.get('/admin/categoryEdit/:id',checkAuth,CategoryController.categoryEdit)
route.get('/admin/categoryDelete/:id',checkAuth,CategoryController.categoryDelete)
route.post('/admin/categoryUpdate/:id',checkAuth,CategoryController.categoryUpdate)



//display blogs
route.get('/admin/blogDisplay',checkAuth,BlogController.display)
route.post('/admin/bloginsert',checkAuth,BlogController.bloginsert)
route.get('/admin/blogView/:id',checkAuth,BlogController.blogView)
route.get('/admin/blogEdit/:id',checkAuth,BlogController.blogEdit)
route.get('/admin/blogDelete/:id',checkAuth,BlogController.blogDelete)
route.post('/admin/blogUpdate/:id',checkAuth,BlogController.blogUpdate)




//user controller
route.post('/userInsert',UserController.userInsert)
route.post('/verifylogin',UserController.verifylogin)
route.get('/users',checkAuth,UserController.display)
route.get('/users',checkAuth,UserController.display)
route.post('/updateStatus/:id',checkAuth,UserController.updateStatus)


//for mail verification 

route.get('/verify',FrontController.verifyMail)


module.exports=route