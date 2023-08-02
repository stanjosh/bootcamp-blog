const router = require('express').Router();
const { db } = require('../model');


router.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

router.get('/', async (req, res) => {
    let posts = await db.getBlogPosts();
    res.render('home', {
        posts: posts
    });
});
    




module.exports = router;