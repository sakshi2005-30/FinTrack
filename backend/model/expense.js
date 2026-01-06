const mongoose=require("mongoose");
const ExpenseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
},{timestamps:true})

module.exports=mongoose.model("expense",ExpenseSchema);