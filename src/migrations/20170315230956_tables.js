
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tables',function (table) {
        table.increments();
        table.string('tableName');
        table.integer('roomID');
    })
};

exports.down = function(knex, Promise) {
  
};
