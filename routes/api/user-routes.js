const router = require('express').Router();
const db = require('../../db');


router.get('/login/:email', async (req, res) => {

  //verify user and set session
  let users = await db.getUsers()
  if (users) {
    res.json(users)
  }
  else {
    res.status(404).send('No users found')
  }

});

router.get('/', async (req, res) => {
  let user = await db.getAllUsers(req.params.id);
  if (user) {
    res.json(user)
  }
  else {
    res.status(404).send('User not found')
  }

});


router.get('/:id', async (req, res) => {
  let user = await db.getUser(req.params.id);
  if (user) {
    res.json(user)
  }
  else {
    res.status(404).send('User not found')
  }

});

router.post('/', async (req, res) => {
  await db.createUser(req.body)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("There was an error creating this user")
  })

});

router.put('/:id', async (req, res) => {
  await db.updateUser(req.params.id, req.body)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("There was an error editing this user")
  })
});

router.delete('/:id', async (req, res) => {
  await db.deleteUser(req.params.id)
  .then((user) => {
    res.status(200).send("Successfuly deleted user")
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("There was an error deleting this user")
  })
});

module.exports = router;
