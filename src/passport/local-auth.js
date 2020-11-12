const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')


const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = User.findOne({
    email: email
  })
  if (!user) {
    return done(null, false, req.flash('signupMessage', 'The Email is alredy taken'))
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = await newUser.encryptPassword(password)
    console.log(newUser)
    await newUser.save();
    console.log('User created')
    done(null, newUser);
  }

}));


passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true

}, async(req,email, password, done)=>{

 const user = await User.findOne({email: email})
 if(!user){
   return done(null, false, req.flash("signinMessage", "No user Found"))
 }
 
 const matchPassword = await bcrypt.compare(password, user.password); 
 if(!matchPassword){
  return done(null, false, req.flash("signinMessage", "Incorrect Password"))
 }
 console.log(user)

 done(null, user)
}))