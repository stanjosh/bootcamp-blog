const router = require('express').Router();
const { db } = require('../model')

router.post('/', async (req, res) => {
  if (req.session.loggedIn) {
    req.body.user_id = req.session.user_id;
    return await db.createComment(req.body)
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
  if (req.session.loggedIn) {
    await db.deleteComment(req.session.user_id, req.params.id)
    .then((comment) => {
      console.log(comment)
      return res.status(200).send("Successfuly deleted comment")
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
