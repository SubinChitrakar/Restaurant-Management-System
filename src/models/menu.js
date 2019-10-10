import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addFood(newFood) {
    console.log(Object.keys(newFood));
    return new Promise((resolve, reject) => {
        knex('foods').insert({
                foodName:newFood.foodName,
                price:newFood.price,
                categoryID:newFood.categoryType,
                foodImage:newFood.image
            })
            .then(addedFood => {
                console.log(addedFood);
                resolve(addedFood);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function readAllFoodItem(currentPage) {
    let limit=8;
    let count=0;
    let offset=currentPage*limit-limit;
    return new Promise((resolve, reject) => {
        knex('foods').count('id').first()
            .then(response=>{
                count=response.count;
                return knex('foods').select('*').limit(limit).offset(offset);
            })
            .then(foodList=>{
                resolve({foodList:foodList, count: count});
            })
            .catch(err=>{
                reject(err);
            })
    });
}

export function getFood(category, currentPage)
{
    let limit=8;
    let count=0;
    let offset=currentPage*limit-limit;
    return new Promise((resolve, reject) => {
        knex('foods').count('id').where({categoryID:category}).first()
            .then(response=>{
                count=response.count;
                return knex('foods').select('*').where({categoryID:category}).limit(limit).offset(offset);
            })
            .then(foodList=>{
                resolve({foodList:foodList, count: count});
            })
            .catch(err=>{
                reject(err);
            })
    });
}




export function searchByID(foodID) {
    return new Promise((resolve, reject) => {
        knex('foods').where({id: foodID}).first('*')
            .then(searchedFood => {
                resolve(searchedFood);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function searchByName(foodName) {
    return new Promise((resolve, reject) => {
        knex('foods').where('foodName', 'like', '%'+foodName+'%')
            .then(searchedFood => {
                resolve(searchedFood);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function updateFood(updatedFood) {
    return new Promise((resolve, reject)=>{
        knex('foods').where({id:updatedFood.id}).update({
            foodName:updatedFood.foodName,
            price:updatedFood.price,
            categoryID:updatedFood.categoryID,
        })
            .then(res=>{
                resolve(res);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

export function deleteFood(foodID) {
    return new Promise((resolve, reject)=>{
        knex('foods').where({id:foodID}).del()
            .then(foodID=>{
                resolve(foodID);
            })
            .catch(err=>{
                reject(err);
            });
    });
}