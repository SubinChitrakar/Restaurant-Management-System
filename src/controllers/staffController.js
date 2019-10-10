import {Router} from 'express';
import loginHandler from '../middlewares/loginHandler';
import * as userServices from '../service/userServices';

let router=Router();

router.get('/', loginHandler, function (req,res,next) {
    let staffList=[];
    userServices.readAll()
        .then((userList)=>{
            res.render('staffManagement',{staffList:userList});
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err})
        })
});

router.get('/addStaff',loginHandler, function (req,res,next) {
        res.render('addStaff');
});

router.post('/submitAddStaff',loginHandler, function (req,res,next) {
    let newUser=[];
    newUser.userfname=req.body.firstName;
    newUser.userlname=req.body.lastName;
    newUser.designation=req.body.designation;
    newUser.username=req.body.username;
    newUser.password=req.body.password;
    userServices.addUser(newUser)
        .then((addedUser)=>{
            res.redirect('/staff');
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.get('/updateStaff/:id',loginHandler, function (req,res,next) {
    let id=req.params.id;
    userServices.searchByID(id)
        .then((updatedUser)=>{
            res.render('updateStaff',updatedUser);
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.put('/submitUpdateStaff',loginHandler, function (req,res,next) {
   let dataForm=req.body;
   userServices.updateUser(dataForm)
       .then(updatedUser=>{
           res.json({data:'Staff Updated'});
       })
       .catch((err)=>{
           res.json({error:err});
       })
});

router.delete('/deleteStaff/:id',loginHandler,function (req,res,next) {
   let id=req.params.id;
   userServices.deleteUser(id)
       .then((userID)=>{
           res.json({data:userID});
       })
       .catch((err)=>{
           res.status(500).json({error:err});
       })
});

export default router;