
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        {id: 1, foodName: 'French Toast', price: 70, categoryID:1,foodImage:'adfadf'},
        {id: 2, foodName: 'Hash Brown', price: 200, categoryID:1,foodImage:'adfad'},
        {id: 3, foodName: 'Hash Potato', price: 70, categoryID:1,foodImage:'fadsfad'},
        {id: 4, foodName: 'Chowmein', price: 150, categoryID:3,foodImage:'adfadsf'},
        {id: 5, foodName: 'Khaja Set', price: 300, categoryID:2,foodImage:'afadsf'}
      ]);
    });
};
