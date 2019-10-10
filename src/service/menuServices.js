import * as menuFunctionalities from "../models/menu";
import * as categoryServices from '../service/categoryServices';

export function addFood(newFood) {
    return menuFunctionalities.addFood(newFood);
}

export function getFood(category,currentPage) {
    if(category)
        return menuFunctionalities.getFood(category,currentPage);
    return menuFunctionalities.readAllFoodItem(currentPage);
}

export function searchByFoodID(foodID) {
    return menuFunctionalities.searchByID(foodID);
}

export function searchByFoodName(foodName) {
    return menuFunctionalities.searchByName(foodName);
}

export function updateFood(updatedFood) {
    return menuFunctionalities.updateFood(updatedFood);
}

export function deleteFood(foodID) {
    return menuFunctionalities.deleteFood(foodID);
}

export function getFoodWithCategory(food) {
    let foodWithCategory;
    return new Promise((resolve, reject) => {
        foodWithCategory = Object.assign({}, food);
        categoryServices.searchByID(foodWithCategory.categoryID)
            .then(category => {
                foodWithCategory.categoryType = category.categoryType;
                resolve(foodWithCategory);
            })
            .catch(err => {
                return reject(err);
            });
    });
}

export function getFoodsWithCategory(foods) {
    let promises =[];

    for(let i=0;i<foods.length;i++){
        promises.push(getFoodWithCategory(foods[i]));
    }
    return Promise.all(promises);
}