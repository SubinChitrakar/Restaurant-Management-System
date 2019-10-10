import {Router} from 'express';
import loginHandler from '../middlewares/loginHandler';

let router=Router();
router.get('/',loginHandler, function (req,res,next) {
   res.render('dashboard');
});

export default router;