import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addCategory(newCategory) {
    return new Promise((resolve, reject) => {
        knex('category').insert({categoryType: newCategory.categoryType}).returning('*')
            .then(addedCategory => {
                resolve(addedCategory);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function listCategory(){
    return new Promise((resolve,reject)=>{
        knex('category').select('*')
            .then(categoryList=>{
                resolve({categoryList:categoryList});
            })
            .catch(err=>{
                reject(err);
        })
    })
}

export function readAllCategory(currentPage) {
    let limit=4;
    let count=0;
    let offset=currentPage*limit-limit;
    return new Promise((resolve, reject) => {
        knex('category').count('id').first()
            .then(response=>{
                count=response.count;
                return knex('category').select('*').limit(limit).offset(offset);
            })
            .then(categoryList=>{
                resolve({categoryList:categoryList, count: count});
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export function searchByID(categoryID) {
    return new Promise((resolve, reject) => {
        knex('category').where({id: categoryID}).first('*')
            .then(searchedCategory => {
                resolve(searchedCategory);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function searchByName(categoryName) {
    return new Promise((resolve, reject) => {
        knex('category').where({categoryType: categoryName}).first('*')
            .then(searchedCategory => {
                resolve(searchedCategory);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function updateCategory(updatedCategory) {
    return new Promise((resolve, reject)=>{
        knex('category').where({id:updatedCategory.id}).update({
            categoryType:updatedCategory.categoryType
        })
            .then(res=>{
                resolve(res);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

export function deleteCategory(categoryID) {
    return new Promise((resolve, reject)=>{
        knex('category').where({id:categoryID}).del()
            .then(categoryID=>{
                resolve(categoryID);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

