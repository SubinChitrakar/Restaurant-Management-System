import * as roomFunctionalities from "../models/room.js";

/**
 * A function which adds a room to the rooms table of the database
 * @param newRoom holds the information of the room (roomID, roomName)
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function addRoom(newRoom) {
    return roomFunctionalities.addRoom(newRoom);
}

/**
 * A function that returns all the rows of the table
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function readAllRoom(currentPage) {
    return roomFunctionalities.readAllRoom(currentPage);
}

/**
 * A function that searches a room by id
 * @param roomID holds a integer value for the roomID to be searched
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function searchByID(roomID) {
    return roomFunctionalities.searchByID(roomID);
}

export function searchByName(roomName) {
    return roomFunctionalities.searchByName(roomName);
}

export function updateRoom(updatedRoom) {
    return roomFunctionalities.updateRoom(updatedRoom);
}

export function deleteRoom(roomID) {
    return roomFunctionalities.deleteRoom(roomID);
}