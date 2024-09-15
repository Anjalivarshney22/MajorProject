const mongoose=require("mongoose");

const schema=mongoose.Schema;

const listingSchema=new schema({
    title:{
        type:String,
        required:true,
    },

    description:String,
    image:{
        filename:{
            type:String,// isko required =true raklhna hai wrna usser image nhin dega formm k time bhuinddalna h 
            // new ejd ki template mein bhi user se input lena hai  bad mein image k url ka
           
        },
        url:{
            type:String,
          
            default:"https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-fWBZ9r4vO9M"
        }
       
        //set:(v)=>v===""?"https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-fWBZ9r4vO9M" : v,
    },

    price:Number,
    location:String,
    country:String,

});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;