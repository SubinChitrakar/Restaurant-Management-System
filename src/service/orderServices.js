import * as orderFunctionalities from "../models/order";
import moment from 'moment';

export function addOrder(newOrder) {
    return orderFunctionalities.addOrder(newOrder);
}

export function getOrder(tableNo)
{
    return orderFunctionalities.getOrder(tableNo);
}

export function updateOrder(updatedOrder) {
    return orderFunctionalities.updateOrder(updatedOrder);
}

export function deleteOrder(orderID) {
    return orderFunctionalities.deleteOrder(orderID);
}

export function reportForToday(currentPage) {
    return new Promise((resolve, reject) => {
        orderFunctionalities.readCurrentDateOrder(currentPage)
            .then(res => {
                for (let orderPayload of res.orderList) {
                    orderPayload.orderDate = moment(orderPayload.orderDate).format('YYYY-MM-DD');
                }
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function reportForDates(currentPage, startDate, endDate) {
    return new Promise((resolve, reject) => {
        orderFunctionalities.readBetweenDateOrder(currentPage, startDate, endDate)
            .then(res => {
                for (let orderPayload of res.orderList) {
                    orderPayload.orderDate = moment(orderPayload.orderDate).format('YYYY-MM-DD');
                }
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    });
}
