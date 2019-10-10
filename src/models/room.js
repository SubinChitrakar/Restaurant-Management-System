import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);


/**
 * A function which adds a room to the rooms table of the database
 * @param newRoom holds the information of the room (roomID, roomName)
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function addRoom(newRoom) {
    return new Promise((resolve, reject) => {
        knex('rooms').insert({roomName: newRoom.roomName}).returning('*')
            .then(addedRoom => {
                resolve(addedRoom);
            })
            .catch(err => {
                reject(err);
            })
    });
}

/**
 * A function that returns all the rows of the table
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function readAllRoom(currentPage) {
    let limit=4;
    let count=0;
    let offset=currentPage*limit-limit;
    return new Promise((resolve, reject) => {
        knex('rooms').count('id').first()
            .then(response=>{
                count=response.count;
                return knex('rooms').select('*').limit(limit).offset(offset);
            })
            .then(roomList=>{
                resolve({roomList:roomList, count: count});
            })
            .catch(err=>{
                reject(err);
            })
    })
}

/**
 * A function that searches a room by id
 * @param roomID holds a integer value for the roomID to be searched
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function searchByID(roomID) {
    return new Promise((resolve, reject) => {
        knex('rooms').where({id: roomID}).first('*')
            .then(searchedRoom => {
                resolve(searchedRoom);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function searchByName(searchedRoom) {
    return new Promise((resolve, reject)=>{
        knex('rooms').where({roomName:searchedRoom}).first('*')
            .then(searchedRoom=>{
                resolve(searchedRoom);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

export function updateRoom(updatedRoom) {
    return new Promise((resolve, reject)=>{
        knex('rooms').where({id:updatedRoom.id}).update({
            roomName:updatedRoom.roomName
        })
            .then(res=>{
                resolve(res);
            })
            .catch(err=>{
                reject(err);
            });
    });
}

export function deleteRoom(roomID) {
    return new Promise((resolve, reject)=>{
        knex('rooms').where({id:roomID}).del()
            .then(roomID=>{
                resolve(roomID);
            })
            .catch(err=>{
                reject(err);
            });
    });
}