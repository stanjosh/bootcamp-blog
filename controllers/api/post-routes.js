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
  if (req.session.logged_in) {  
  await db.createBlogPost(req.body)
    .then((blogpost) => {
      res.status(200).json(blogpost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  } else {
    return res.status(401)
  }
});

router.put('/:id', async (req, res) => {
  if (req.session.logged_in && req.session.user_id === req.body.user_id) {
  await db.updateBlogPost(req.params.id, req.body)
    .then((blogpost) => {
      return res.status(200).json(blogpost);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  } else {
    return res.status(401)
  }
});

router.delete('/:id', async (req, res) => {
  if (req.session.logged_in && req.session.user_id === req.body.user_id) {
  await db.deleteBlogPost(req.params.id)
  .then(() => {
    return res.status(200).send("Successfuly deleted blog post")
  })
  .catch((err) => {
    console.log(err)
    return res.status(500).json(err);
  })
  } else {
    return res.status(401)
  }
});

module.exports = router;
