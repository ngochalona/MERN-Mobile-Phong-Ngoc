import express from 'express'
import passport from 'passport'
import User from '../models/userModel.js'
import { provideGoogle, provideFacebook} from '../controllers/provideController.js'

const router = express.Router();


// @desc        Auth with google
// @route       GET / auth/ google
// passport.authenticate: middleware giúp ta gắn kịch bản local vào route.
router.post('/google', provideGoogle);

// @desc        Google auth callback
// @route       GET / auth/ google/ callback
router.get('/google/callback', passport.authenticate(
    'google', 
    {
        failureFlash: '/',
    }),
    function(req, res) {
        res.redirect('/')
    }
)

// @desc        Auth with facebook
// @route       GET / auth/ facebook
// passport.authenticate: middleware giúp ta gắn kịch bản local vào route.
//router.get('/facebook', passport.authenticate('facebook'));
router.post('/facebook', provideFacebook);


// @desc        Google auth callback
// @route       GET / auth/ facebook/ callback
router.get('/facebook/callback',
    passport.authenticate('facebook', {failureFlash: '/',}),
    function(req, res) {
        res.redirect('/api/products');
    }
)

// @decs    Logout user
// @route   /auth/logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

export default router