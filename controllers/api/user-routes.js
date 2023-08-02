const router = require('express').Router();
const { db } = require('../../model');


router.get('/', async (req, res) => {
  let user = await db.getAllUsers(req.params.id);
  if (user) {
    return res.json(user)
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

  await db.updateUser(req.params.id, req.body)
  .then((user) => {
    return res.status(200).json(user);
  })
  .catch((err) => {
    console.log(err)
    return res.status(500).send("There was an error editing this user")
  })
});

router.delete('/:id', async (req, res) => {
  await db.deleteUser(req.params.id)
  .then((user) => {
    return res.status(200).send("Successfuly deleted user")
  })
  .catch((err) => {
    console.log(err)
    return res.status(500).send("There was an error deleting this user")
  })
});

module.exports = router;
