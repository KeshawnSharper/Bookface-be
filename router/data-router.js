const express = require('express');

const data = require('./data-model')

const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")

router.use(cors({ origin: "*" }));
router.use(bodyParser.json());


router.post('/register', (req, res) => {
  let user = req.body
  let hash = bcrypt.hashSync(user.password,13)
  user.online = false
  user.password = hash 
  data.register(user)
  .then(project => {
    res.status(201).json(project)
   })
.catch(err => {
res.status(500).json({ message: 'Failed to get schemes' })
})

})


router.post('/login', (req, res) => {
  let body = req.body
  data.login(body)
  .first()
  .then(user => {
    const payload = {
      userid:user.id,
      username:user.first_name
    }
    const options = {
      expiresIn:"1d"
    }
    const token = jwt.sign(payload,"secret",options)
    if (user && bcrypt.compareSync(body.password,user.password))
    {res.status(201).json({ id:user.id,name:user.first_name + " " + user.last_name,picture:user.picture,token:token})}
   else {
     res.status(404).json({message:`invalid creditinials`})
   }
  })
  .catch(err => {
    res.status(500).json({ message: err })
    console.log(err)
  });
});

router.get('/:id/friends', (req, res) => {
    data.getFriends(req.params.id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  })
});
router.put('/photos/:id', (req, res) => {
  data.editPhotos(req.params.id,req.body)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
});
router.get('/photos/:id', (req, res) => {
  data.getPhotos(req.params.id)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
});
router.get('/comments/:id', (req, res) => {
  data.getComments(req.params.id)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
});
router.get('/users', (req, res) => {
  data.getUsers()
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.get('/:id/messages/:receiver_id', (req, res) => {
    data.getMessages(req.params.id,req.params.receiver_id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
  });

  router.get('/info/:id', (req, res) => {
    data.getInfo(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  ids = []
  router.get('/posts/:id', (req, res) => {
    data.getPosts(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
    
  })

  router.get('/posts/', (req, res) => {
    data.getAllPosts()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
    
  })
 
  router.post('/message', (req, res) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    req.body.read = false
    req.body.time = time
    data.sendMessage(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.post('/post/:id', (req, res) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    req.body.likes = 0
    req.body.time = time
    req.body.user_id = req.params.id
    data.post(req.body)
    .then(project => {
     res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.post('/comment/:id', (req, res) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    req.body.time = time
    req.body.post_id = req.params.id
    data.comment(req.body)
    .then(project => {
     res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: req.body });
    });
  });
  router.post('/friends/', (req, res) => {
    
      data.addFriend(req.body.friend_id,req.body.user_id)
      .then(
        data.addFriend(req.body.user_id,req.body.friend_id).then(project => res.status(201).json(project))
      )
      .catch(err => {
        res.status(500).json({ message: 'Failed to get schemes' });
      });
      req.body.request_id = req.body.friend_id 
    })
    router.post('/del_requests/', (req, res) => {
    
      data.deleteRequests(req.body)
      .then( project => 
        res.status(200).json(project)
      )
      .catch(err => {
        res.status(500).json({ message: 'Failed to get schemes' });
      });
    })
    
   
  
  router.put('/info/:id', (req, res) => {
    req.body.id = req.params.id
    data.updateInfo(req.body)
    .then(project => {
       res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.put('/messages/:id', (req, res) => {
    data.editMessages(req.body)
    .then(project => {
       res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });

  router.post('/requests/', (req, res) => {
    
    data.sendRequests(req.body)
    .then(project => {
       res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.get('/requests/:id', (req, res) => {
    
    data.getRequests(req.params.id)
    .then(project => {
       res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.get('/newMessages/:id', (req, res) => {
    
    data.newMessages(req.params.id)
    .then(project => {
       res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.get('/likes', (req, res) => {
    
    data.getLikes()
    .then(project => {
       res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.get('/likes/:id', (req, res) => {
    
    data.getPostLikes(req.params.id)
    .then(project => {
       res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.post('/likes', (req, res) => {
    
    data.like(req.body)
    .then(project => {
       res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  router.put('/likes', (req, res) => {
    
    data.editPosts(req.body)
    .then(project => {
       res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
  });
  

module.exports = router
