const router = require('express').Router();
const { db } = require('../model')



router.post('/login', async (req,res) => {
  let authUser = await db.authUser(req.body)
  .catch((err) => {
    return res.status(500).send("There was an error logging in.")
  });
  if ( authUser ) {  
    console.log(authUser);
    req.session.user_id=authUser.id;
    req.session.author_name=authUser.author_name;
    req.session.email=authUser.email;
    req.session.loggedIn=true;
    req.session.save(function(err) {
      if (err) {
        return res.status(500).send("There was an error logging in.")
      }
      else {
        return res.status(200).redirect('/dashboard');
      }
    });
  }
  else {
    return res.status(401).send("Incorrect email or password.");
  }
})

router.post('/', async (req, res) => {
  let authUser = await db.createUser(req.body)
  .catch((err) => {
    return res.status(500).send("There was an error creating the user.")
  });;
  if ( authUser ) {  
    req.session.user_id=authUser.id;
    req.session.author_name=authUser.author_name;
    req.session.email=authUser.email;
    req.session.loggedIn=true;
    req.session.save(function(err) {
      if (err) {
        return res.status(500).send("There was an error logging in.")
      }
      else {
        return res.status(200).redirect('/dashboard');
      }
    });
  }
  else {
    return false;
  }
});


router.get('/logout', (req,res) => {
  req.session.destroy(function(err) {
    if (err) {
      return res.status(500).send("There was an error logging out.") 
    }
    else {
      return res.status(200).redirect('/');
    }
  });
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
