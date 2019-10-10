
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rooms',function (table) {
        table.increments();
        table.string('roomName');
    })
};

exports.down = function(knex, Promise) {
  
};
