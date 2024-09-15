const mongoose=require("mongoose");

const Listing=require("../models/listing.js");
const data =require("./data.js");

async function main(){
    mongoose.connect('mongodb://localhost:27017/wanderLust');
}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("It has error");

});

const initData = async () => {
    try {
      console.log("Initializing the database...");
      await Listing.deleteMany({});
      console.log("Existing data deleted");
      data.forEach((key)=>{
         Listing.insertMany(key);
      })
      
      console.log("Data was initialized");
  
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };
   initData();
  