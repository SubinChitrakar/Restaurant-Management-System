import {Router} from 'express';
import * as categoryServices from '../service/categoryServices'

let router=Router();

router.get('/', function (req,res,next) {
    categoryServices.listCategories()
        .then(response=>{
            res.json({categoryList: response});
        })
        .catch((err) => {
            res.status(500).json({data: 'Database Error', error: err});
        })
});

export default router;