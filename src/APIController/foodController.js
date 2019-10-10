import {Router} from 'express';
import * as menuServices from '../service/menuServices'
import * as categoryServices from '../service/categoryServices';

let router=Router();

router.post('/categorySearch', function (req,res,next) {
    let searchedCategory=req.body.categoryName;
    let currentPage=req.query.page||1;
    let count=0;
    let categoryAfterSearch;
    categoryServices.searchByName(searchedCategory)
        .then(response=>{
            console.log(response);
            categoryAfterSearch=response;
            return menuServices.getFood(categoryAfterSearch.id,currentPage)
        })
        .then(response=>{
            count=response.count;
            return menuServices.getFoodsWithCategory(response.foodList);
        })
        .then(foodWithCategory=>{
            res.json({foodList:foodWithCategory, count:count, currentPage: currentPage, perPage:8});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/foodSearch/:id',function (req,res,next) {
    let searchedID=req.params.id;
    menuServices.searchByFoodID(searchedID)
        .then(response=>{
            res.json({searchedFood:response});
        })
        .catch(err=>{
            res.json({data: 'Database Error', error: err});
        })
});

router.post('/foodSearchName',function (req,res,next) {
   let searchedName=req.body.searchedName;
   menuServices.searchByFoodName(searchedName)
       .then(response=>{
           res.json({searchedFood:response});
       })
       .catch(err=>{
           res.json({data: 'Database Error', error: err});
       })
});

export default router;
