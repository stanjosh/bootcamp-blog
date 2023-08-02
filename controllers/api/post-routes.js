const router = require('express').Router();
const { db } = require('../../model');

router.get('/', async (req, res) => {
  let blogposts = await db.getBlogPosts();
  if (blogposts) {
    let blogposts = blogposts.map((blogpost) => blogpost.get({ plain: true }));
    res.status(200).json(blogposts)
  }
  else {
    res.status(404).send('No blog posts found')
  }
});

// get one blogpost
router.get('/:id', async (req, res) => {
  let blogpost = await db.getBlogPost(req.params.id);
  if (blogpost) {
    let blogpost = blogpost.get({ plain: true });
    res.status(200).json(blogpost)
  }
  else {
    res.status(404).send('Blog post not found')
  }
});

router.post('/', async (req, res) => {
  await db.createBlogPost(req.body)
    .then((blogpost) => {
      res.status(200).json(blogpost);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  await db.updateBlogPost(req.params.id, req.body)
    .then((blogpost) => {
      return res.status(200).json(blogpost);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  await db.deleteBlogPost(req.params.id)
  .then(() => {
    return res.status(200).send("Successfuly deleted blog post")
  })
  .catch((err) => {
    console.log(err)
    return res.status(500).send("There was an error deleting this blog post")
  })
});

module.exports = router;
