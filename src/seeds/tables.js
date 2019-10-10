
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tables').del()
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        {id: 1, tableName: 'table1', roomID: 1},
        {id: 2, tableName: 'table2', roomID: 1},
        {id: 3, tableName: 'table3', roomID: 1},
        {id: 4, tableName: 'table4', roomID: 1},
        {id: 5, tableName: 'table5', roomID: 2}
      ]);
    });
};
