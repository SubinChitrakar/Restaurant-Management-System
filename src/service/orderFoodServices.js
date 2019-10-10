import * as orderFoodFunctionalities from "../models/orderFood";

export function addOrderFood(newOrder,newOrderFood) {
    return orderFoodFunctionalities.addOrderFood(newOrder,newOrderFood);
}

export function updateOrderFood(updatedOrderFood) {
    return orderFoodFunctionalities.updateFoodOrder(updatedOrderFood);
}

export function deleteOrderFood(orderFoodID) {
    return orderFoodFunctionalities.deleteFoodOrder(orderFoodID);
}
export function addOrderFoods(newOrder, foodList){
    let promises =[];
    for(let i=0;i<foodList.length;i++){
        promises.push(addOrderFood(newOrder[0].id,foodList[i]))
    }
    return Promise.all(promises);
}