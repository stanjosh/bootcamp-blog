const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
  let blogpost = await BlogPost.findAll(
    {
      include: [{ model: User }, { model: Comment }]

    }
  )
  if (blogpost) {
    res.json(blogpost)
  }
  else {
    res.status(404).send('No blog posts found')
  }
});

// get one blogpost
router.get('/:id', async (req, res) => {
  let blogpost = await BlogPost.findByPk(req.params.id, {
    include: [{ model: User }, { model: Comment }]
  })
  if (blogpost) {
    res.json(blogpost)
  }
  else {
    res.status(404).send('Blog post not found')
  }
});

router.post('/', (req, res) => {
  BlogPost.create(req.body)
    .then((blogpost) => {
      res.status(200).json(blogpost);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  BlogPost.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((blogpost) => {
      res.status(200).json(blogpost);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  await BlogPost.destroy({
  where: {
        id: req.params.id
      }
  })
  .then(() => {
    res.status(200).send("Successfuly deleted blog post")
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("There was an error deleting this blog post")
  })
});

module.exports = router;
