const router = require('express').Router();
const db = require('../db');

router.get('/form', async (req, res) => {
    await db.getBlogPosts()
    .then((posts) => {
    res.render('form');
    })
});

router.get('/', async (req, res) => {
    await db.getBlogPosts()
    .then((posts) => {
    res.render('home', { posts: posts } );
    })
});

module.exports = router;