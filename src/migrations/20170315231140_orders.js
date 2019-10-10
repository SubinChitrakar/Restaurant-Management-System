
exports.up = function(knex, Promise) {
    return knex.schema.createTable('orders',function (table) {
        table.increments();
        table.string('orderDate');
        table.integer('tableNo');
        table.integer('price');
    })
};

exports.down = function(knex, Promise) {
  
};
