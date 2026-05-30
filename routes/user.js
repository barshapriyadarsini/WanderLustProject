const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {isLoggedInLike}=require("../middleware.js");
const userContoller=require("../controllers/users.js");

// router.get("/signup",userContoller.renderSignUpForm);

// router.post("/signup",wrapAsync(userContoller.signup));

router.route("/signup")
    .get(userContoller.renderSignUpForm)
    .post(wrapAsync(userContoller.signup));

router.route("/login")
    .get(userContoller.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
    userContoller.login
);

// router.get("/login",userContoller.renderLoginForm);

// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
//     userContoller.login
// );

router.get("/logout",userContoller.logout);

//like
router.route("/loginLike")
    .get(userContoller.loginLikeRenderForm)
    .post(
    saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/loginLike',failureFlash:true }),
    userContoller.loginLike);

// router.get("/loginLike",userContoller.loginLikeRenderForm);
//like
// router.post(
//     "/loginLike",
//     saveRedirectUrl,
//     passport.authenticate('local', { failureRedirect: '/loginLike',failureFlash:true }),
//     userContoller.loginLike);


//wishlist
router.get("/wishlist", isLoggedInLike, userContoller.wishlist);

module.exports=router;