const router = require('express').Router();
const db = require('../db');


router.get('/', async (req, res) => {
    await db.getBlogPosts()
    .then((posts) => {
    res.render('home', { posts: posts } );
    })
});

module.exports = router;