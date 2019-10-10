
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orderfood').del()
    .then(function () {
      // Inserts seed entries
      return knex('orderfood').insert([
        {id: 1, orderID: 1,foodID:1,quantity:1},
        {id: 2, orderID: 1,foodID:2,quantity:1},
        {id: 3, orderID: 1,foodID:3,quantity:1},
        {id: 4, orderID: 1,foodID:4,quantity:1}
      ]);
    });
};
