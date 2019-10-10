import {Router} from 'express';
import loginHandler from '../middlewares/loginHandler';
import * as orderServices from '../service/orderServices';
import * as orderFoodServices from '../service/orderFoodServices';

let router = Router();

router.get('/', loginHandler, function (req, res, next) {
    res.render('revenueManagement');
});

router.get('/todayDate', loginHandler, function (req, res, next) {
    let currentPage=req.query.page||1;
    orderServices.reportForToday(currentPage)
        .then(response=>{
            console.log(response);
            res.render('revenueManagement', {orderList: response.orderList, count:response.count, totalPrice:response.totalPrice, currentPage: currentPage, perPage:10});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/differentDate', loginHandler, function (req,res,next) {
    let currentPage=req.query.page||1;
    let fromDate = req.query.fromDate;
    let toDate=req.query.toDate;

    orderServices.reportForDates(currentPage,fromDate,toDate)
        .then(response=>{
            res.render('revenueManagement', {orderList: response.orderList, count:response.count, totalPrice:response.totalPrice, currentPage: currentPage, perPage:10});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

export default router;
