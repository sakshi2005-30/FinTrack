const mongoose=require("mongoose");
const connectToDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected sucessfully")
    }
    catch(error){
        console.log("Error",e);
        process.exit(1)
    }
}
module.exports=connectToDB