import {Router} from 'express';
import {verifyUser} from '../service/userServices';

let router = Router();

router.post('/', function (req,res,next) {
    let user = {};
    user.username=req.body.username;
    user.password=req.body.password;
    verifyUser(user)
        .then((response) =>{
            res.json({designation: response.designation});
        })
        .catch((err)=>{
            res.status(500).json({data:'Database Error', error:err});
        })
});

export default router;
