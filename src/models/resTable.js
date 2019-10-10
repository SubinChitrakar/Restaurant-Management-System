import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

/**
 * A function which adds a table to the tables table of the database
 * @param newTable holds the information of the table (id, tableName, roomID)
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function addTables(newTable){
    return new Promise((resolve, reject)=>{
        knex('tables').insert({tableName:newTable.tableName, roomID:newTable.roomID}).returning('*')
            .then(addedTable=>{
                resolve(addedTable);
            })
            .catch(err=>{
                reject(err);
            })
    });
}

/**
 * A function that returns all the rows of the table
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function listTables() {
    return new Promise((resolve,reject)=>{
        knex('tables').select('*')
            .then(tableList=>{
                resolve(tableList);
            })
            .catch(err=>{
                reject(err);
            })
    })
}



export function readAllTables(currentPage) {
    let limit=12;
    let count=0;
    let offset=currentPage*limit-limit;
    return new Promise((resolve, reject)=>{
        knex('tables').count('id').first()
            .then(response=>{
                count=response.count;
                return knex('tables').select('*').limit(limit).offset(offset);
            })
            .then(tableList=>{
                resolve({tableList:tableList, count: count});
            })
            .catch(err=>{
                reject(err);
            })
    });
}

export function searchByID(tableID) {
    return new Promise((resolve, reject) => {
        knex('tables').where({id: tableID}).first('*')
            .then(searchedTable => {
                resolve(searchedTable);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function updateTable(updatedTable) {
    return new Promise((resolve, reject)=>{
        knex('tables').where({id:updatedTable.id}).update({
            tableName:updatedTable.tableName,
            roomID: updatedTable.roomNameFromList
        })
            .then(res=>{
                resolve(res);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

export function deleteTable(tableID) {
    return new Promise((resolve, reject)=>{
        knex('tables').where({id:tableID}).del()
            .then(tableID=>{
                resolve(tableID);
            })
            .catch(err=>{
                reject(err);
            });
    });
}