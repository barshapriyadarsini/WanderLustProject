// const mongoose=require("mongoose");
// const initData=require("./data");
// const Listing=require("../models/listing.js");
// const { application } = require("express");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

// main().then(()=>{
//     console.log("Connected to DB");
// }).catch(err=>{
//     console.log(err);
// })
// async function main() {
//   await mongoose.connect(MONGO_URL);

// }

// const initDB=async()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
// }

// initDB();

// app.get("/listings",(req,res)=>{
//     const allListings=Listing.find({});
//     res.render("index.ejs",{allListings})
// })

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:'6a1184c5c6dbb5acdb70fafc'}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();