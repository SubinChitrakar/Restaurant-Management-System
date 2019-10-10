import {Router} from 'express';
import cloudinary from 'cloudinary';
import multipart from 'connect-multiparty';
import loginHandler from '../middlewares/loginHandler';
import * as menuServices from '../service/menuServices';
import {readAllCategory} from '../service/categoryServices';

cloudinary.config({
    cloud_name: 'da2wjimyd',
    api_key: '656832438848877',
    api_secret: 'QPaSID0NK1Se_7Uqw-mODuNzm20'
});

let multipartMiddleware = multipart();
let router=Router();

router.get('/',loginHandler, function (req,res,next) {
    let currentPage=req.query.page||1;
    let categoryID=req.query.category;
    let count=0;
    let category = [];
    let foodlist = [];
    menuServices.getFood(categoryID, currentPage)
        .then(response=>{
            count=response.count;
            foodlist=foodlist.concat(response.foodList);
            return readAllCategory();
        })
        .then(categ=>{
            category = category.concat(categ);
            return menuServices.getFoodsWithCategory(foodlist);
        })
        .then(foodWithCategory=>{
            res.render('menuManagement',{foodList:foodWithCategory, count:count, currentPage: currentPage, perPage:8, categoryList:category});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/addFood',loginHandler, function (req,res,next) {
    readAllCategory()
        .then(response =>{
            console.log(response);
            res.render('addFood',{categoryList:response.categoryList});
        })
        .catch(err=>{
            res.json({data:'Database Error', error: err});
        })
});

router.post('/addSubmitFood', multipartMiddleware ,function (req,res,next) {
    let formData=req.body;

    const imageFile = req.files.image.path;

    cloudinary.v2.uploader.upload(imageFile, {tags: 'express_sample'})
        .then(image =>{
            formData.image = image.url;
            return menuServices.addFood(formData)
        })
        .then(addedFood =>{
            res.redirect('/');
        })
        .catch(err =>{
            res.json({data:'Database Error', error: err});
        });
});

router.get('/updateMenu/:id',loginHandler, function (req,res,next) {
    let id=req.params.id;
    let updatedFood;
    menuServices.searchByFoodID(id)
        .then((response)=>{
            updatedFood=response;
            return readAllCategory();
        })
        .then(categoryList=>{
            res.render('updateFood',{updatedFood:updatedFood,categoryList:categoryList.categoryList});
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.put('/submitUpdateFood',loginHandler, function (req,res,next) {
    let dataForm=req.body;
    menuServices.updateFood(dataForm)
        .then(updatedFood=>{
            res.json({data:'Table Updated'});
        })
        .catch((err)=>{
            res.json({error:err});
        })
});

router.delete('/deleteFood/:id',loginHandler,function (req,res,next) {
    let id=req.params.id;
    menuServices.deleteFood(id)
        .then((roomID)=>{
            res.json({data:roomID});
        })
        .catch((err)=>{
            res.status(500).json({error:err});
        })
});


export default router;