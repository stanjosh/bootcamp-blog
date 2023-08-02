
const router = require('express').Router();
const { db } = require('../../model');



router.post('/login', async (req,res) => {
    const user = await db.authUser(req.body);
    console.log("login user " + user)
    if ( user ) {
        
        req.session.user_id=user.id;
        req.session.author_name=user.author_name;
        req.session.email=user.email;
        req.session.loggedIn=true;
        req.session.save;
        console.log('login! '+ req.session)
        res.redirect('/')
    }
    else{
        return false
    }
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;