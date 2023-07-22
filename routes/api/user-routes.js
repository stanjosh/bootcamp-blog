const router = require('express').Router();
const { Comment, User, BlogPost } = require('../../models');


router.get('/login/:email', async (req, res) => {

  //verify user and set session
  let users = await User.findAll();
  if (users) {
    res.json(users)
  }
  else {
    res.status(404).send('No users found')
  }

});

router.get('/:id', async (req, res) => {
  let user = await User.findByPk(req.params.id, {
    include: [{ model: BlogPost }, { model: Comment }]
  });
  if (user) {
    res.json(user)
  }
  else {
    res.status(404).send('User not found')
  }

});

router.post('/', async (req, res) => {
  await User.create(req.body)
    .then((user) => {
      res.status(200).json(user);
    })

});

router.put('/:id', async (req, res) => {
  let userUpdate = req.body
  await User.update(userUpdate, { where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json(user);
    })
});

router.delete('/:id', async (req, res) => {
  const userID = req.params.id
    await User.destroy({
      where: {
          id: userID,
      }
  })
  .then((user) => {
    res.status(200).send("Successfuly deleted user")
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("There was an error deleting this user")
  })
});

module.exports = router;
