const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/config')

const User = require('../models/user.model');

const isUser = function (req, res, next) {

}



router.get('', (req, res, next) => {
    console.log('I`m here')
    res.send('hello')
});
// Register
router.post('/register', (req, res, next) => {
    console.log(req.body)
    // Make new User
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        password: req.body.pass.password
    })
    // Check info
    if (!newUser.firstName || !newUser.email || !newUser.password) return res.json({ success: false, msg: 'Information not full' });
    // Save User
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to ragister user'})
        } else {
            res.json({ success: true, data: user, msg: 'User Registered' })
        }
    })
});
// Authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, msg: 'Wrong email or password' })
            return
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            console.log(err, isMatch)
            if (err) throw err;
            if (isMatch) {
                console.log(user)
                const token = jwt.sign({ data: user }, config.sessionSecret, {
                    expiresIn: 604800 // 1 week
                });

                user.password = '';
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: user
                })
            } else {
                res.json({ success: false, msg: 'Wrong email or password' })
            }
        })
    })
});
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user})
});
router.get('', (req, res, next) => {
    console.log('I`m here')
    res.send('hello')
});


module.exports = router;