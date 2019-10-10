
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {id: 1, orderDate: '3/11/2017',tableNo:1,price:110},
        {id: 2, orderDate: '3/11/2017',tableNo:2,price:200},
        {id: 3, orderDate: '3/11/2017',tableNo:3,price:300}
      ]);
    });
};
