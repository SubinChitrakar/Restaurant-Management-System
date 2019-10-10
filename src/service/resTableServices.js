import * as tableFunctionalities from "../models/resTable";
import {searchByID} from '../service/roomServices';

/**
 * A function which adds a table to the tables table of the database
 * @param newRoom holds the information of the room (roomID, roomName)
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function addTable(newTable) {
    return tableFunctionalities.addTables(newTable);
}

/**
 * A function that returns all the rows of the table
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function listTable(){
    return tableFunctionalities.listTables();
}

export function readAllTable(currentPage) {
    return tableFunctionalities.readAllTables(currentPage);
}

export function searchByTableID(tableID) {
    return tableFunctionalities.searchByID(tableID);
}

export function updateTable(updatedTable) {
    return tableFunctionalities.updateTable(updatedTable);
}

export function deleteTable(tableID) {
    return tableFunctionalities.deleteTable(tableID);
}



/**
 * A function to get the roomName of all the tables present
 * @param table holds the information of the table's room to be searched
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function getTableWithRoom(table) {
    let tableWithRoom;
    return new Promise((resolve, reject) => {
        tableWithRoom = Object.assign({}, table);
        searchByID(table.roomID)
            .then(room => {
                tableWithRoom.roomName = room.roomName;
                resolve(tableWithRoom);
            })
            .catch(err => {
                return reject(err);
            });
    });
}

/**
 * This function which adds the room to the tables
 * @param tables holds the information of all the tables
 * @returns {Promise.<*>} a resolved value, if the SQL statement executes. This does not return any resolved value unless all the promises are completed
 */
export function getTablesWithRoom(tables) {
    let promises =[];
    for(let i=0;i<tables.length;i++){
        promises.push(getTableWithRoom(tables[i]))
    }
    return Promise.all(promises);
}