
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
id: 1,
first_name: "Keshawn",
last_name: "Sharper",
email: "ksharper@studentmba.org",
password: "Keyboys1",
gender: "Male",
birthday: "09/09/1998",
online:false
},
        {
id: 2,
first_name: "Kevin",
last_name: "Durant",
email: "kevindurant@gmail.com",
password: "Sharper2",
gender: "Male",
birthday: "09/29/1988"
,
online:false
        },
        {
id: 3,
first_name: "Jackie",
last_name: "Chan",
email: "jackieChan@gmail.com",
password: "Durant35",
gender: "Male",
birthday: "04/07/1954"
,
online:false
        }
      ]);
    });
};
