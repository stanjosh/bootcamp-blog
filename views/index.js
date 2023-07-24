const router = require('express').Router();
const db = require('../db');



router.get('/', async (req, res) => {
    posts = await db.getBlogPosts();
    console.log(req.session)
    if(req.session.userid){
        res.render('blog', {posts: posts, session: req.session});
    }else
    res.render('home');
});
    

module.exports = router;