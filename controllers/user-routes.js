const router = require('express').Router();
const { db } = require('../model')


router.post('/login', async (req,res) => {
  const user = await db.authUser(req.body)
  .catch((err) => {
    return res.status(500).send("There was an error logging in.")
  });
  if ( user ) {  
    req.session.user_id=user.id;
    req.session.author_name=user.author_name;
    req.session.email=user.email;
    req.session.loggedIn=true;
    req.session.save;
    res.redirect('/')
  }
  else{
    return res.status(401);
  }
})

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/register', (req, res) => {
  return res.render('register');
})

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

router.post('/', async (req, res) => {
  await db.createUser(req.body)
  .then((user) => {
      return res.status(200).json(user);
    })
  .catch((err) => {
      console.log(err)
      return res.status(500).send("There was an error creating this user")
    })
});

router.put('/:id', async (req, res) => {
  if (req.session.loggedIn) {
  await db.updateUser(req.params.id, req.body)
  .then((user) => {
    return res.status(200).json(user);
  })
  .catch((err) => {
    return res.status(500).send("There was an error editing this user")
  });
  } else {
    return res.status(401);
  };
});






module.exports = router;
