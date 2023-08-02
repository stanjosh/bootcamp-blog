const router = require('express').Router();
const { db } = require('../../model');

router.get('/', async (req, res) => {
  let comments = await db.getAllComments();
  if (comments) {
    let comments = comments.map((comment) => comment.get({ plain: true }));
    return res.status(200).json(comments)
  }
  else {
    return res.status(404).send('No comments found')
  }

});

router.get('/:id', async (req, res) => {
  let comment = await db.getComment(req.params.id).get({ plain: true });
  if (comment) {
    return res.status(200).json(comment)
  }
  else {
    return res.status(404).send('Comment not found')
  }

});

router.post('/', async (req, res) => {
  await db.createComment(req.body)
  .then((comment) => {
    return res.status(200).json(comment);
  })

});

router.put('/:id', async (req, res) => {
  await db.updateComment(req.params.id, req.body)
  .then((comment) => {
    return res.status(200).json(comment);
  })
});

router.delete('/:id', async (req, res) => {
  await db.deleteComment(req.params.id)
  .then((comment) => {
    return res.status(200).send("Successfuly deleted comment")
  })
  .catch((err) => {
    console.log(err)
    return res.status(500).send("There was an error deleting this comment")
  })
});

module.exports = router;
