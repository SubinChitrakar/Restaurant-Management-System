import {Router} from 'express';
import * as tableServices from '../service/resTableServices';

let router = Router();

router.get('/', function (req, res, next) {
    tableServices.listTable()
        .then(tableList=>{
            res.json({tableList: tableList});
        })
        .catch((err) => {
            res.status(500).json({data: 'Database Error', error: err});
        })
});

export default router;
