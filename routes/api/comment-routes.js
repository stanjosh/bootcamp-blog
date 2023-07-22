const router = require('express').Router();
const { Comment, User, BlogPost } = require('../../models');

router.get('/', async (req, res) => {
  let comments = await Comment.findAll({
    include: [{model: User }, {model: BlogPost}]
  });
  if (comments) {
    res.json(comments)
  }
  else {
    res.status(404).send('No comments found')
  }

});

router.get('/:id', async (req, res) => {
  let comment = await Comment.findByPk(req.params.id, {
    include: [{model: User }, { model: BlogPost }]
  });
  if (comment) {
    res.json(comment)
  }
  else {
    res.status(404).send('Comment not found')
  }

});

router.post('/', async (req, res) => {
  await Comment.create(req.body)
    .then((comment) => {
      res.status(200).json(comment);
    })

});

router.put('/:id', async (req, res) => {
  await Comment.update(req.body, { where: { id: req.params.id } })
    .then((comment) => {
      res.status(200).json(comment);
    })
});

router.delete('/:id', async (req, res) => {
  const commentID = req.params.id
    await Comment.destroy({
      where: {
          id: commentID,
      }
  })
  .then((comment) => {
    res.status(200).send("Successfuly deleted comment")
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("There was an error deleting this comment")
  })
});

module.exports = router;
