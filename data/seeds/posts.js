
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, user_id: 3,time:'04:12:34',message: 'hi',likes: 0,comments: 1},
        {id: 2, user_id: 3,time:'04:12:34',message: 'hi',likes: 0,comments:1 },
        {id: 3,user_id: 3,time:'04:12:34',message: 'hi',likes: 0,comments: 1}
      ]);
    });
};
