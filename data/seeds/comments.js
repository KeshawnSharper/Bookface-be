
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, message: 'Im better than Lebron',time:'04:12:34',post_id: 1,user_id: 2},
        {id: 2, message: 'kawhi is just a system player',time:'04:12:34',post_id: 2,user_id: 2},
        {id: 3, message: 'Your 2 pts helped alot',time:'04:12:34',post_id: 3,user_id: 2}
      ]);
    });
};
