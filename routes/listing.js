const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const User = require("../models/user.js");
// const User=require("..models/user.js")
const {isLoggedIn,isOwner,validateListing, isLoggedInLike}=require("../middleware.js");
const listingController=require("../controllers/listings.js");

const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

//index route and create route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.createListing));
//     .post(
//         upload.single("listing[image][url]"),
//         (req,res)=>{
//             // console.log(req.file);
//             res.send(req.file);
//     }
// )
    
    // .post(upload.single('listing[image][url]'),(req,res)=>{
        // console.log(req.body);
        // res.send(req.file);
    // })

router.get(
    "/category/:category",
    validateListing,
    wrapAsync(listingController.filterCategory)
);

router.get("/search", wrapAsync(listingController.searchListings));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

// show route and update route and delete route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


// show route
// router.get("/:id",wrapAsync(listingController.showListing)
// );


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)
);


// update route
// router.put("/:id",isOwner,validateListing,wrapAsync(listingController.updateListing));


// delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//like route
router.post("/:id/like", isLoggedInLike, wrapAsync(listingController.likeListing)
);




module.exports=router;