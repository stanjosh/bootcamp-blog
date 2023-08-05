const router = require('express').Router();
const { db } = require('../model') 


router.use(async function (req, res, next) {
    res.locals.session = req.session;
    res.locals.posts = await db.getBlogPosts();
    next();
});

router.get('/', async (req, res) => {
    res.render('home');
});
    




module.exports = router;