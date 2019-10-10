import {Router} from 'express';
import loginHandler from '../middlewares/loginHandler';
import * as roomServices from '../service/roomServices'

let router=Router();
router.get('/',loginHandler, function (req,res,next) {
    let currentPage=req.query.page||1;
    let count=0;
    roomServices.readAllRoom(currentPage)
        .then(response=>{
            res.render('roomManagement', {roomList: response.roomList, count:response.count, currentPage: currentPage, perPage:4});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/addRoom', loginHandler, function (req,res,next) {
   res.render('addRoom');
});

router.post('/submitAddRoom',loginHandler, function (req,res,next) {
    let newRoom={};
    newRoom.roomName=req.body.roomName;

    roomServices.addRoom(newRoom)
        .then((addedRoom)=>{
            res.redirect('/room');
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.get('/updateRoom/:id',loginHandler, function (req,res,next) {
    let id=req.params.id;
    roomServices.searchByID(id)
        .then((updatedRoom)=>{
            res.render('updateRoom',updatedRoom);
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.put('/submitUpdateRoom',loginHandler,function (req,res,next) {
    let dataForm=req.body;
    roomServices.updateRoom(dataForm)
        .then(updatedRoom=>{
            res.json({data:'Room Updated'});
        })
        .catch((err)=>{
            res.json({error:err});
        })
});

router.delete('/deleteRoom/:id',loginHandler,function (req,res,next) {
    let id=req.params.id;
    roomServices.deleteRoom(id)
        .then((roomID)=>{
            res.json({data:roomID});
        })
        .catch((err)=>{
           res.status(500).json({error:err});
        })
});
export default router;