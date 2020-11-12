const express = require("express")
const passport = require("passport")
const router = express.Router()


router.get("/", (req, res, next) => {
    res.render('index')
})

router.get("/signup", (req, res, next) => {
    res.render('signup')
})

router.post("/signup", passport.authenticate('local-signup',{
    successRedirect : '/profile',
    failureRedirect: '/signup',
    passReqToCallBack: true
}))


router.get("/signin", (req, res, next) => {
    res.render('signin')
})

router.post("/signin", passport.authenticate('local-signin',{
    successRedirect : '/profile',
    failureRedirect: '/signin',
    passReqToCallBack: true
}))

router.get('/profile',isAuthenticated, (req, res, next)=>{
    res.render('profile')
})

router.get('/logout', (req, res, next)=>{
    req.logOut()
    res.redirect('/')
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

module.exports = router