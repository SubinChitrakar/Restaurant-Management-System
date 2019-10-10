import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addCartOrder(newCartOrder) {
    return new Promise((resolve, reject) => {
        knex('cartforwaiter').insert({
            tableNo:newCartOrder.tableNo,
            foodID:newCartOrder.foodID,
            quantity:newCartOrder.quantity,
            totalPrice:newCartOrder.totalPrice
        }).returning('*')
            .then(addedCart => {
                resolve(addedCart);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function getCartOrder(tableNo){
    return new Promise((resolve,reject)=>{
        knex('cartforwaiter').where({tableNo:tableNo}).select('*')
            .then(readAllOrder=>{
                resolve(readAllOrder);
            })
            .catch(error=>{
                reject(error);
            })
    })
}

export function updateCartOrder(updatedCartOrder) {
    return new Promise((resolve, reject)=>{
        knex('cartforwaiter').where({
            tableNo:updatedCartOrder.tableNo,
            foodID:updatedCartOrder.foodID
        }).update({
            quantity:updatedCartOrder.quantity,
            totalPrice:updatedCartOrder.totalPrice
        }).then(res=>{
                resolve(res);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

export function deleteCartOrder(newCartOrder) {
    return new Promise((resolve, reject) => {
        knex('cartforwaiter').where({
            tableNo:newCartOrder.tableNo,
            foodID:newCartOrder.foodID
        }).del()
            .then(deletedCartID=>{
                resolve(deletedCartID);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

