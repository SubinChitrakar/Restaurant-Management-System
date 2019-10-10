/**
 * A javascript file which handles all the request and points to the controller of the project
 */
import {Router} from 'express';

//Web Controllers
import user from './controllers/loginController';
import dashboard from './controllers/dashboardController';
import staff from './controllers/staffController';
import tables from './controllers/tableController';
import rooms from  './controllers/roomController';
import category from './controllers/categoryController';
import menu from './controllers/menuController';
import revenue from './controllers/revenueController';

//Mobile Controllers
import loginAPI from './APIController/loginController';
import tableAPI from './APIController/tableController';
import categoryAPI from './APIController/categoryController';
import menuAPI from './APIController/foodController';
import orderAPI from './APIController/orderController';
import cartAPI from './APIController/cartForWaiterController';

let router = Router();

//Web Routes
router.use('/',user);
router.use('/dashboard', dashboard);
router.use('/staff', staff);
router.use('/table', tables);
router.use('/room',rooms);
router.use('/category',category);
router.use('/menu',menu);
router.use('/revenue',revenue);

//API Routes
router.use('/api/login',loginAPI);
router.use('/api/tables',tableAPI);
router.use('/api/categories',categoryAPI);
router.use('/api/menu',menuAPI);
router.use('/api/order',orderAPI);
router.use('/api/cart',cartAPI);
export default router;