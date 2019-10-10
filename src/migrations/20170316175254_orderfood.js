
exports.up = function(knex, Promise) {
    return knex.schema.createTable('orderfood',function (table) {
        table.increments();
        table.integer('orderID');
        table.integer('foodID');
        table.integer('quantity');
    })
};

exports.down = function(knex, Promise) {
  
};
