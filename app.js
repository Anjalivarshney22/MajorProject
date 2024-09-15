const express=require("express");
const app=express();
app.use(express.json());
const mongoose=require("mongoose");
const Listing=require("../MajorProject/models/listing");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");

async function main(){
  mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');

}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("It has error");

});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("i am root");
});
//index route
  app.get("/listing", async(req,res)=>{
      const alllistings= await  Listing.find({});
      console.log(alllistings);
      res.render("listings/index",{alllistings});
  });


  // too crete new Listing or add new listing in the website....
 
  app.get("/listing/new",(req,res)=>{
    console.log("it is working");
    res.render("listings/new");
  });
    // create ROUTE
  app.post("/listing", async (req, res) => {
    let{ title,description,price,country,location}=req.body;
    const addedListing = new Listing({
      title,
      description,
      price,
      country,
      location
  });

   await addedListing.save();
   res.redirect("/listing");
      
  });

//show route
  app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
      res.render("../views/listings/show",{ listing });
    }
    
  );

  // edit route
  
  app.get("/listing/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    console.log("id is founded ");
    res.render("listings/edit",{listing});
  });
  //update route
  app.put("/listing/:id/",async(req,res)=>{
    let {id}=req.params;
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { title: req.body.title, description: req.body.description, price: req.body.price, location: req.body.location, country: req.body.country },
      { new: true }
    );
    res.redirect(`/listing/${id}`);
  });
  //delete route
  app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
  });

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})  