const User=require("../models/user.js");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        let{email,username,password}=req.body;
        const newUser=new User({email,username});
        const registereUser=await User.register(newUser,password);
        // console.log(registereUser);
        req.login(registereUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings")
        })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    } 
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
        req.flash("success","Welcome back to  WanderLust !");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        // res.redirect("/listings");
        res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
}

module.exports.loginLikeRenderForm=(req,res)=>{
    res.render("users/loginLike.ejs");
}

module.exports.loginLike=async(req,res)=>{
        req.flash("success","Welcome back to  WanderLust !");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect("/listings");
        
}

module.exports.wishlist=async(req,res)=>{
    let user=await User.findById(req.user._id).populate("wishlist");
    // console.log(user);
    res.render("users/wishlist.ejs",{user});
}