const db = require('../data/dbConfig');

function getUsers() {
  return db("users").then(users => {
    return users.map(user => {
      user.online = user.online ? true :false
        return user
    })
})}
function getFriends(id) {
    return db("users").select('user_id',"online","first_name","last_name","email","gender","birthday","picture").join('friends', 'users.id', '=', 'friends.user_id').where({"friends.friend_id":id})
    .then(users => {
      return users.map(user => {
        user.online = user.online ? true :false
          return user
      })
  })}
  function getMessages(first,second) {
    return db("messages").where({"messages.receiver_id":first}).andWhere({"messages.sender_id":second}).orWhere({"messages.sender_id":first}).andWhere({"messages.receiver_id":second}).then(messages => {
      return messages.map(message => {
        message.read = message.read ? true :false
          return message
      })
  })
  }
function getInfo(id){
    return db("users").select("id","first_name","email","last_name",
    "birthday","online").where({"id":id}).then(users => {
      return users.map(user => {
        user.online = user.online ? true :false
          return user
      })
})}
function getPhotos(id){
  return db("pictures").where({"user_id":id})
}
function editPhotos(id,data){
  return db("pictures").where({"user_id":id}).update(data)
}
function getPosts(id){
  return db("posts").select("posts.id As id","user_id","email","last_name",
  "time",
  "likes",
  "comments",
  "message",
  "video","posts.picture").join('users', 'users.id', '=', 'posts.user_id')
  .where({"posts.id":id})
}
function editPosts(data){
  return db("posts").where({"posts.id":data.id}).update(data)
}
function getAllPosts(){
  return db("posts").select("posts.id As id","user_id","first_name","last_name",
  "time",
  "likes",
  "message",
  "comments",
  "video","posts.picture").join('users', 'posts.user_id', '=', 'users.id'  )
  
}
function sendMessage(data) {
  return db("messages").insert(data)
   
}
function post(data) {
  return db("posts").insert(data)
   
}
function getComments(data) {
  return db("comments").where({"post_id":data}).join('users', 'user_id', '=', 'users.id')
  .select(
    "comments.id As id","user_id","first_name", "last_name", "time", "message","post_id",
     "users.picture")
    
    // "first_name",
    // "last_name",
//   "time",
//   "likes",
//   "message",
//  "users.picture")
   
}
function comment(data) {
  return db("comments").insert(data)
   
}
function addFriend(friend_id,user_id) {
  return db("friends").insert({friend_id,user_id})
   
}
function postPics(data) {
  return db("pictures").insert(data)
   
}
function addInfo(data) {
  return db("info").insert(data)
   
}
function updateInfo(data) {
  return db("users").where({id:data.id}).update(data)
   
}
function register(user){
  return db("users").insert(user)
  }
  function login(user)
 { 
     return db("users").where({"email":user.email})
 }
 function addProfile(data)
 { 
     return db("users").insert(data)
 }
 function sendRequests(data)
 { 
     return db("friend_requests").insert(data)
 }
 function getRequests(data)
 { 
     return db("friend_requests").join('users', 'request_id', '=', 'users.id').where({"user_id":data})
 }
 function getLikes()
 { 
     return db("likes").select("likes.id As id","likes.user_id As user_id","first_name","last_name",
     "post_id",
"users.picture").join('posts', 'post_id', '=', 'posts.id').join('users', 'likes.user_id', '=', 'users.id')
 }
 function getPostLikes(id)
 { 
     return db("likes").select("likes.id As id","likes.user_id As user_id","first_name","last_name",
     "post_id",
"users.picture").join('posts', 'post_id', '=', 'posts.id').join('users', 'likes.user_id', '=', 'users.id')
.where({"post_id":id})
 }
 function like(data)
 { 
     return db("likes").insert(data)
 }

 function deleteRequests(data)
 { 
     return db("friend_requests").where({"user_id":data.user_id}).where({"request_id":data.request_id}).del()
 }
 function newMessages(id)
 { 
     return db("messages").where({"receiver_id":id}).where({"read":false}).join('users', 'sender_id', '=', 'users.id')
     .select(
       "messages.id As id","sender_id","first_name", "last_name", "time", "message",
        "users.picture").then(messages => {
      return messages.map(message => {
        message.read = message.read ? true :false
          return message
      })
  })
 }
 function editMessages(data)
 { 
     return db("messages").where({"id":data.id}).update(data)
 }

module.exports = {
  getComments,
  getPostLikes,
    like,
    post,
    getFriends,
    getMessages,
    getInfo,
    getPosts,
    sendMessage,
    comment,
    addFriend,
    postPics,
    addInfo,
    updateInfo,
    register,
    login,
    addProfile,
    deleteRequests,
    sendRequests,
    getAllPosts,
    getPhotos,
    editPhotos,
    getUsers,
    getRequests,
    getLikes,
    newMessages,
    editPosts,
    editMessages
}