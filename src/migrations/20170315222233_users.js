
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',function (table) {
      table.increments();
      table.string('userfName');
      table.string('userlName');
      table.string('designation');
      table.string('username');
      table.string('password');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

