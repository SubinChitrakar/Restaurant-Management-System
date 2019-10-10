
exports.up = function(knex, Promise) {
    return knex.schema.createTable('category',function (table) {
        table.increments();
        table.string('categoryType');
    })
};

exports.down = function(knex, Promise) {
  
};
