import {Router} from 'express';
import loginHandler from '../middlewares/loginHandler';
import * as tableServices from '../service/resTableServices';
import {readAllRoom} from '../service/roomServices';

let router = Router();

router.get('/', loginHandler, function (req, res, next) {
    let currentPage=req.query.page||1;
    let count=0;
    tableServices.readAllTable(currentPage)
        .then(response => {
            count=response.count;
            return tableServices.getTablesWithRoom(response.tableList);
        })
        .then(tableListWithRooms=>{
            res.render('tableManagement',{tableList:tableListWithRooms, count:count, currentPage: currentPage, perPage:12})
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/addTable',loginHandler, function (req,res,next) {
    let currentPage=req.query.page||1;
    readAllRoom(currentPage)
        .then(response =>{
            res.render('addTable',{roomList:response.roomList});
        })
        .catch(err=>{
            res.json({data:'Database Error', error: err});
        })
});

router.post('/submitAddTable',loginHandler, function (req,res,next) {
    let newTable={};
    newTable.tableName=req.body.tableName;
    newTable.roomID=req.body.roomNameFromList;

    tableServices.addTable(newTable)
        .then((addedTable)=>{
            res.redirect('/table');
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.get('/updateTable/:id',loginHandler, function (req,res,next) {
    let id=req.params.id;
    let updatedTable;
    tableServices.searchByTableID(id)
        .then((response)=>{
            updatedTable=response;
            return readAllRoom()
        })
        .then(roomList=>{
            res.render('updateTable',{updatedTable:updatedTable,roomList:roomList.roomList});
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.put('/submitUpdateTable',loginHandler, function (req,res,next) {
    let dataForm=req.body;
    tableServices.updateTable(dataForm)
        .then(updatedTable=>{
            res.json({data:'Table Updated'});
        })
        .catch((err)=>{
            res.json({error:err});
        })
});


router.delete('/deleteTable/:id',loginHandler,function (req,res,next) {
    let id=req.params.id;
    tableServices.deleteTable(id)
        .then((tableID)=>{
            res.json({data:tableID});
        })
        .catch((err)=>{
            res.status(500).json({error:err});
        })
});


export default router;