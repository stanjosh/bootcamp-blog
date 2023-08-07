const router = require('express').Router();
const { db } = require('../model');

router.get('/', async (req, res) => {
  let blogposts = await db.getBlogPosts();
  if (blogposts) {
    let blogposts = blogposts.map((blogpost) => blogpost.get({ plain: true }));
    return res.status(200).json(blogposts)
  }
  else {
    return res.status(404).send('No blog posts found')
  }
});

router.post('/', async (req, res) => {
  if (req.session.loggedIn) {  
  await db.createBlogPost(req.session.user_id, req.body)
    .then((blogpost) => {
      return res.status(200).json(blogpost);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  } else {
    return res.status(401)
  }
});

router.put('/:id', async (req, res) => {
  if (req.session.loggedIn) {
    console.log(req.body)
  await db.updateBlogPost(req.session.user_id, req.params.id, req.body)
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
  if (req.session.loggedIn) {
  await db.deleteBlogPost(req.session.user_id, req.params.id)
  .then((blogpost) => {
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
