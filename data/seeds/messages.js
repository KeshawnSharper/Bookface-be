
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {id: 1, message: 'hi',sender_id:1,receiver_id:2,read:false,time:'04:12:34'},
        {id: 2, message: 'hi',sender_id:3,receiver_id:1,read:true,time:'04:12:34'},
        {id: 3, message: 'sup',sender_id:1,receiver_id:3,read:true,time:'04:12:34'}
      ]);
    });
};
