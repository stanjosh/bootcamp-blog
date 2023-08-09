const router = require('express').Router();
const { db } = require('../model') 


//home and dashboard are really the same except for the data displayed
router.get('/dashboard', async (req, res) => {
    res.locals.session = req.session;
    res.locals.posts = await db.getBlogPosts(req.session.user_id);
    res.render('home');
});


router.get('/', async (req, res) => {
    res.locals.session = req.session;
    res.locals.posts = await db.getBlogPosts();
    res.render('home');
});
    




module.exports = router;