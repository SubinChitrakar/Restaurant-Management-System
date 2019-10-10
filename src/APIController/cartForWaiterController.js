import {Router} from 'express';
import * as cartService from '../service/cartForWaiterService'

let router=Router();

router.post('/addCart', function (req,res,next) {
    let newCart=[];
    newCart.tableNo=req.body.tableNo;
    newCart.foodID=req.body.foodID;
    newCart.quantity=req.body.quantity;
    newCart.totalPrice=req.body.totalPrice;
    cartService.addCart(newCart)
        .then(response=>{
            res.json({newlyAddedCart: response});
        })
        .catch((err) => {
            res.status(500).json({data: 'Database Error', error: err});
        })
});

router.post('/getCartOrder', function (req,res,next) {
    let tableNum=req.body.tableNo;
    cartService.getCartOrder(tableNum)
        .then(response=>{
            res.json({AllOrder: response});
        })
        .catch((err) => {
            res.status(500).json({data: 'Database Error', error: err});
        })
});

router.post('/updateCart', function (req,res,next) {
    let updatedCart=[];
    updatedCart.tableNo=req.body.tableNo;
    updatedCart.foodID=req.body.foodID;
    updatedCart.quantity=req.body.quantity;
    updatedCart.totalPrice=req.body.totalPrice;
    cartService.updateCard(updatedCart)
        .then(response=>{
            res.json({updatedCart: response});
        })
        .catch((err) => {
            res.status(500).json({data: 'Database Error', error: err});
        })
});

router.post('/deleteCart', function (req,res,next) {
    let deletedCart=[];
    deletedCart.tableNo=req.body.tableNo;
    deletedCart.foodID=req.body.foodID;
    cartService.deleteCard(deletedCart)
        .then(response=>{
            res.json({message:"Cart Deleted"});
        })
        .catch((err) => {
            res.status(500).json({data: 'Database Error', error: err});
        })
});
export default router;
