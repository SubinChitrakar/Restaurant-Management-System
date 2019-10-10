import {Router} from 'express';
import loginHandler from '../middlewares/loginHandler';
import * as categoryServices from '../service/categoryServices'

let router=Router();

router.get('/',loginHandler, function (req,res,next) {
    let currentPage=req.query.page||1;
    let count=0;
    categoryServices.readAllCategory(currentPage)
        .then(response=>{
            res.render('categoryManagement', {categoryList: response.categoryList, count:response.count, currentPage: currentPage, perPage:4});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/addCategory', loginHandler, function (req,res,next) {
    res.render('addCategory');
});

router.post('/submitAddCategory',loginHandler, function (req,res,next) {
    let newCategory={};
    newCategory.categoryType=req.body.categoryType;

    categoryServices.addCategory(newCategory)
        .then((addedCategory)=>{
            res.redirect('/category');
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.get('/updateCategory/:id',loginHandler, function (req,res,next) {
    let id=req.params.id;
    categoryServices.searchByID(id)
        .then((updatedCategory)=>{
            console.log(updatedCategory);
            res.render('updateCategory',updatedCategory);
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.put('/submitUpdateCategory',loginHandler,function (req,res,next) {
    let dataForm=req.body;
    console.log(dataForm);
    categoryServices.updateCategory(dataForm)
        .then(updatedCategory=>{
            res.json({data:'Category Updated'});
        })
        .catch((err)=>{
            res.json({error:err});
        })
});

router.delete('/deleteCategory/:id',loginHandler,function (req,res,next) {
    let id=req.params.id;
    categoryServices.deleteCategory(id)
        .then((categoryID)=>{
            res.json({data:categoryID});
        })
        .catch((err)=>{
            res.status(500).json({error:err});
        })
});

export default router;