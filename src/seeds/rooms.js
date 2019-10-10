
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        {id: 1, roomName: 'Kathmandu'},
        {id: 2, roomName: 'Patan'},
        {id: 3, roomName: 'Pokhara'},
        {id: 4, roomName: 'Bhaktapur'},
        {id: 5, roomName: 'Chitwan'}
      ]);
    });
};
