import {Router} from 'express';
import {verifyUser} from '../service/userServices';

let router = Router();
router.get('/',function (req,res,next) {
    if(req.session.page_views >1){
        res.redirect('/dashboard');
        return;
    }
    req.session.page_views =1;
    res.render('login');
});

router.post('/login', function (req,res,next) {
    let user = {};
    user.username=req.body.username;
    user.password=req.body.password;
    verifyUser(user)
        .then((response) =>{
            if(response.designation=='Admin') {
                req.session.page_views++;
                res.redirect('/dashboard');
            }
            else if (response.designation=='No Designation')
            {
                res.render('login',{error:'Wrong Credentials'});
            }
            else
            {
                res.render('login',{warning:'Permission Not Granted'});
            }
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.get('/logout',function (req,res,next) {
   req.session.page_views = 1;
   res.redirect('/');
});
export default router;