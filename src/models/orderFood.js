import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addOrderFood(newOrder, newOrderFood) {
    console.log('asdasd', newOrder, newOrderFood);
    return new Promise((resolve, reject) => {
        knex('orderfood').insert({
            orderID: newOrder,
            foodID: newOrderFood.foodID,
            quantity: newOrderFood.quantity
        }).returning('*')
            .then(addedOrder => {
                resolve(addedOrder);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function updateFoodOrder(updatedFoodOrder) {
    return new Promise((resolve, reject) => {
        knex('orderfood').where({id: updatedFoodOrder.id}).update({
            orderID: updatedFoodOrder.orderID,
            foodID: updatedFoodOrder.foodID,
            quantity: updatedFoodOrder.quantity
        })
            .then(updatedOrderFood => {
                resolve(updatedOrderFood);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteFoodOrder(orderFoodID) {
    return new Promise((resolve, reject) => {
        knex('orderfood').where({id: orderFoodID}).del()
            .then(deletedOrderFoodID => {
                resolve(deletedOrderFoodID);
            })
            .catch(err => {
                reject(err);
            });
    });
}

