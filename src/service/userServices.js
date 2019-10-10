import * as userFunctionalities from "../models/user.js";

/**
 * A function which adds a user to the users table of the database
 * @param newUser holds the information of the user (userfname, userlname, designation, username, password)
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function addUser(newUser) {
    return userFunctionalities.addUser(newUser);
}

/**
 * A function that returns all the rows of the table
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function readAll() {
    return userFunctionalities.readAllUser();
}

/**
 * A function that searches a user by id
 * @param userID holds a integer value for the userID to be searched
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function searchByID(userID) {
    return userFunctionalities.searchByID(userID);
}

/**
 * A function that searches a user by name
 * @param userName holds a string value for the username to be searched
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function searchByName(userName) {
    return userFunctionalities.searchByName(userName);
}

/**
 * A function to update the user details
 * @param updatedUser has the updated value of the user
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function updateUser(updatedUser) {
    return userFunctionalities.updateUser(updatedUser);
}

/**
 * A function to delete a user according to his username
 * @param userName holds the information of the username
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function deleteUser(userID) {
    return userFunctionalities.deleteUser(userID);
}

/**
 * A function to check whether the given username and password is there in the database or not
 * @param existingUser holds the information of the username and password
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function verifyUser(checkUser) {
    return userFunctionalities.verifyUser(checkUser);
}