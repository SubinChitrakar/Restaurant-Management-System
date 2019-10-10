
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {id: 1, categoryType: 'Breakfast'},
        {id: 2, categoryType: 'Lunch'},
        {id: 3, categoryType: 'Snack'}
      ]);
    });
};
