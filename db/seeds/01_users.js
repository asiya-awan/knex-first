exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'User 1', email: 'user01@hotmail.com'},
        {id: 2, name: 'User 2', email: 'user02@hotmail.com'},
        {id: 3, name: 'User 3', email: 'user03@hotmail.com'}
      ]);
    });
};
