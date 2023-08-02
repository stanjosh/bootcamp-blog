
const router = require('express').Router();
const db = require('../../db');



router.post('/login', async (req,res) => {
    const user = await db.authUser(req.body);

    if ( user ) {
        session=req.session;
        session.userid=user.id;
        console.log(req.session)
        res.redirect(`../`);
    }
    else{
        res.redirect('../loginNotSuccessful');
    }
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('../');
});

module.exports = router;