
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pictures').del()
    .then(function () {
      // Inserts seed entries
      return knex('pictures').insert([
        {id: 1, user_id:3,time:'04:12:34',picture:"https://picsum.photos/150/150"},
        {id: 2, user_id:3,time:'04:12:34',picture:"https://picsum.photos/150/150"},
        {id: 3, user_id:3,time:'04:12:34',picture:"https://picsum.photos/150/150"},
      ]);
    });
};
