const router = require('express').Router();
const { db } = require('../model');

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

router.post('/', async (req, res) => {
  if (req.session.loggedIn) {  
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
  if (req.session.loggedIn && req.session.user_id === res.posts.user_id) {
  await BlogPost.update(req.body, { where: { id: req.params.id } })
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
  let post = await db.getBlogPost(req.params.id)
  if (req.session.loggedIn && req.session.user_id === post.id) {
  await post.destroy()
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







module.exports = router
