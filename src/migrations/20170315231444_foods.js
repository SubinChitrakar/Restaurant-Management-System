
exports.up = function(knex, Promise) {
    return knex.schema.createTable('foods',function (table) {
        table.increments();
        table.string('foodName');
        table.integer('price');
        table.integer('categoryID');
        table.text('foodImage');
    })
};

exports.down = function(knex, Promise) {
  
};
