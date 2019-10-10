import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

/**
 * A function which adds a user to the users table of the database
 * @param newUser holds the information of the user (userfname, userlname, designation, username, password)
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function addUser(newUser) {
    return new Promise((resolve, reject) => {
        knex('users').insert({
            userfName: newUser.userfname,
            userlName: newUser.userlname,
            designation: newUser.designation,
            username: newUser.username,
            password: newUser.password
        }).returning('*')
            .then(addedUser => {
                resolve(addedUser);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * A function that returns all the rows of the table
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function readAllUser() {
    return new Promise((resolve, reject) => {
        knex('users').select('*')
            .then(userList => {
                resolve(userList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * A function that searches a user by name
 * @param searchedName holds a string value for the username to be searched
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function searchByName(searchedName) {
    return new Promise((resolve, reject) => {
        knex('users').where({username: searchedName}).select('*')
            .then(searchedUser => {
                resolve(searchedUser);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * A function that searches a user by id
 * @param userID holds a integer value for the userID to be searched
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function searchByID(userID) {
    return new Promise((resolve, reject) => {
        knex('users').where({id: userID}).first('*')
            .then(searchedUser => {
                resolve(searchedUser);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * A function to update the user details
 * @param updatedUser has the updated value of the user
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function updateUser(updatedUser) {
    return new Promise((resolve, reject) => {
        knex('users').where({id: updatedUser.id}).update({
            userfName: updatedUser.firstName,
            userlName: updatedUser.lastName,
            designation: updatedUser.designation
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * A function to delete a user according to his username
 * @param userName holds the information of the username
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function deleteUser(userID) {
    return new Promise((resolve, reject) => {
        knex('users').where({id: userID}).del()
            .then(userID => {
                resolve(userID);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * A function to check whether the given username and password is there in the database or not
 * @param existingUser holds the information of the username and password
 * @returns {Promise} a resolver value which returns a resolved value, if the SQL statement executes
 */
export function verifyUser(existingUser) {
    return new Promise((resolve, reject) => {
        knex('users').where({
            username: existingUser.username,
            password: existingUser.password
        }).select('designation').first()
            .then(res => {
                return res ? resolve(res) : resolve({designation: "No Designation"});
            })
            .catch(err => {
                reject(err);
            });
    });
}








