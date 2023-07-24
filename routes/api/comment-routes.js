const router = require('express').Router();
const db = require('../../db');

router.get('/', async (req, res) => {
  let comments = db.getComments();
  if (comments) {
    res.json(comments)
  }
  else {
    res.status(404).send('No comments found')
  }

});

router.get('/:id', async (req, res) => {
  let comment = await db.getComments(req.params.id);
  if (comment) {
    res.json(comment)
  }
  else {
    res.status(404).send('Comment not found')
  }

});

router.post('/', async (req, res) => {
  await db.createComment(req.body)
  .then((comment) => {
    res.status(200).json(comment);
  })

});

router.put('/:id', async (req, res) => {
  await db.updateComment(req.params.id, req.body)
  .then((comment) => {
    res.status(200).json(comment);
  })
});

router.delete('/:id', async (req, res) => {
  await db.deleteComment(req.params.id)
  .then((comment) => {
    res.status(200).send("Successfuly deleted comment")
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("There was an error deleting this comment")
  })
});

module.exports = router;
