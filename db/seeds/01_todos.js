
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {id: 1, completed: true, title: 'studying'},
        {id: 2, completed: false, title: 'watching movie'},
        {id: 3, completed: true, title: 'cooking'}
      ]);
    });
};
