const router = require('express').Router();
const { db } = require('../model')



router.post('/login', async (req,res) => {
  let authUser = await db.authUser(req.body)
  .catch((err) => {
    return res.status(500).send("There was an error logging in.")
  });
  if ( authUser ) {  
    req.session.user_id=authUser.id;
    req.session.author_name=authUser.author_name;
    req.session.email=authUser.email;
    req.session.loggedIn=true;
    req.session.save;
    res.redirect('/dashboard');
  }
  else {
    return false;
  }
})

router.post('/', async (req, res) => {
  let authUser = await db.createUser(req.body);
  if ( authUser ) {  
    req.session.user_id=authUser.id;
    req.session.author_name=authUser.author_name;
    req.session.email=authUser.email;
    req.session.loggedIn=true;
    req.session.save;
    res.redirect('/dashboard');
  }
  else {
    return false;
  }
});


router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});



router.get('/', async (req, res) => {
  let users = await db.getAllUsers(req.params.id);
  if (users) {
     return res.json(users)
  }
  else {
    return res.status(404).send('User not found')
  }
});


router.get('/:id', async (req, res) => {
  let user = await db.getUser(req.params.id);
  if (user) {
    let user = user.get({ plain: true });
    return res.json(user)
  }
  else {
    return res.status(404).send('User not found')
  }
});



router.put('/:id', async (req, res) => {
  if (req.session.loggedIn) {
  await db.updateUser(req.params.id, req.body)
  await db.authUser(req.body)
  .then((user) => {
    return res.redirect('/');
  })
  .catch((err) => {
    return res.status(500).send("There was an error editing this user")
  });
  } else {
    return res.status(401);
  };
});






module.exports = router;
