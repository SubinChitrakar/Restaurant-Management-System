import config from '../knexfile';
import knexJs from 'knex';
import moment from 'moment';

let knex = knexJs(config.development);

export function addOrder(newOrder) {
    return new Promise((resolve, reject) => {
        knex('orders').insert({
            tableNo: newOrder.tableNo,
            price: newOrder.price
        }).returning('*')
            .then(newOrder => {
                resolve(newOrder);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function getOrder(tableNo){
    return new Promise((resolve,reject)=>{
       knex('orders').where({tableNo:tableNo}).select('*')
           .then(allOrder=>{
               resolve(allOrder);
           })
           .catch(error=>{
               reject(error);
           })
    });
}

export function updateOrder(updatedOrder) {
    return new Promise((resolve, reject) => {
        knex('orders').where({id: updatedOrder.id}).update({
            tableNo: updatedOrder.tableNo,
            price: updatedOrder.price
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteOrder(orderID) {
    return new Promise((resolve, reject) => {
        knex('orders').where({id: orderID}).del()
            .then(deletedOrder => {
                resolve(deletedOrder);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readCurrentDateOrder(currentPage) {
    let limit = 6;
    let count = 0;
    let total = 0;
    let orderToday;
    let offset = currentPage * limit - limit;
    let currentDate = moment().format('YYYY-MM-DD');
    return new Promise((resolve, reject) => {
        knex('orders').count('id').where({orderDate: currentDate}).first()
            .then(response => {
                count = response.count;
                return knex('orders').select('*').where({orderDate: currentDate}).limit(limit).offset(offset);
            })
            .then(response=> {
                orderToday = response;
                return knex('orders').sum('price').where({orderDate: currentDate}).first()
            })
            .then(totalPrice => {
                resolve({orderList: orderToday, count: count, totalPrice: totalPrice.sum});
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function readBetweenDateOrder(currentPage, startDate, endDate) {
    let limit = 6;
    let count = 0;
    let orderBetweenDates;
    let offset = currentPage * limit - limit;
    let fromDate = moment(startDate).format('YYYY-MM-DD');
    let toDate = moment(endDate).format('YYYY-MM-DD');
    return new Promise((resolve, reject) => {
        knex('orders').count('id').whereBetween('orderDate', [fromDate, toDate]).first()
            .then(response => {
                count = response.count;
                return knex('orders').select('*').whereBetween('orderDate', [fromDate, toDate]).limit(limit).offset(offset);
            })
            .then(orderForDates => {
                orderBetweenDates = orderForDates;
                return knex('orders').sum('price').whereBetween('orderDate', [fromDate, toDate]).first()
            })
            .then(totalPrice => {
                resolve({orderList: orderBetweenDates, count: count, totalPrice: totalPrice.sum});
            })
            .catch(err => {
                reject(err);
            })
    });
}
