import {Router} from 'express';
import * as orderServices from '../service/orderServices';
import * as orderFoodServices from '../service/orderFoodServices';

let router=Router();

router.post('/addOrder', function (req,res,next){
    let order=[];
    let addedOrder;
    let orderFoodList=[];
    order.tableNo=req.body.tableNo;
    order.price=req.body.price;
    orderFoodList=req.body.foodList;
    orderServices.addOrder(order)
        .then(newOrder=>{
            addedOrder=newOrder;
            return orderFoodServices.addOrderFoods(newOrder,orderFoodList)
        })
        .then(addedFoodOrder=>{
            res.json({newOrder:addedOrder,newFoodOrder:addedFoodOrder});
        })
        .catch(error=>{
            res.status(500).json({data:'Database Error', error:error});
        })
});

router.post('/getOrder',function (req,res,next) {
   let tableNo=req.body.tableNo;
   orderServices.getOrder(tableNo)
       .then(allOrder=>{
           res.json({allOrder:allOrder})
       })
       .catch(error=>{
           res.status(500).json({data:'Database Error', error:error});
       })
});

export default router;