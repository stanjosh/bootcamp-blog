const router = require('express').Router();
const blogpostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');


router.use('/post', blogpostRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);



module.exports = router;