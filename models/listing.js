const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")

const listingSchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    description: String,
    // image: {
    //     filename: String,
    //     type: String,
    //     default: "https://unsplash.com/photos/a-tree-in-a-field-with-a-full-moon-in-the-background-o0OyMksw65s",
    //     set: (v) => v === "" 
    //         ? "https://unsplash.com/photos/a-tree-in-a-field-with-a-full-moon-in-the-background-o0OyMksw65s"
    //         : v
    //     },

    image: {
        filename: String,
        url: {
            type: String,
            default: "https://plus.unsplash.com/premium_photo-1664127685124-01d5292c1f1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) =>
                v === ""
                    ? "https://plus.unsplash.com/premium_photo-1664127685124-01d5292c1f1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : v
        }
    },

    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    likes:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            
    },
        coordinates: {
            type: [Number],
            
    }

    },
    category:{
        type:String,
        enum:["trending","rooms","iconicCities","mountain","castles","amazingpools","camping","farms","arctic","domes","boats"]
    }
});
listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
    
})
const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;

