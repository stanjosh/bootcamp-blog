const router = require('express').Router();
const { db } = require('../../model');

router.post('/', async (req, res) => {
  if (req.session.logged_in) {
  await db.createComment(req.body)
  .then((comment) => {
    return res.status(200).json(comment);
  })
  .catch((err) => {
    console.log(err)
    return res.status(500)
  })
  } else {
    return res.status(401)
  }
});

router.delete('/:id', async (req, res) => {
  if (req.session.logged_in && req.session.user_id === req.body.user_id) {
  await db.deleteComment(req.params.id)
  .then((comment) => {
    return res.status(200)
  })
  .catch((err) => {
    console.log(err)
    return res.status(500)
  })
  } else {
    return res.status(401)
  }
});

module.exports = router;
