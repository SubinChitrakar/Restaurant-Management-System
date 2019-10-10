
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, userfName:'Subin', userlName:'Chitrakar', designation:'Admin', username:'Subin',password:'subin'},
        {id: 2, userfName:'Swarupa', userlName:'Gurung', designation:'Admin', username:'Swarupa',password:'swarupa'},
        {id: 3, userfName:'Mohammed', userlName:'Naved', designation:'Manager', username:'Naved',password:'naved'}
      ]);
    });
};
