const Expense=require("../model/expense")

const getAllExpenses=async(req,res)=>{
    try{
        const expenses=(await Expense.find().sort({createdAt:-1}));
        return res.status(200).json({
            message:"All expenses fetched successfully",
            data:expenses
        })

    }
    catch(err){
        console.log("Error",err);
        return res.status(500).json({
            message:"Cannot get all the expenses"
        })
    }
}
const addExpense=async(req,res)=>{
    try {

        const {title,amount,type}=req.body;
        if(!title || !amount || !type){
            return res.status(400).json({
                message:"There are some fields missing"
            })
        }
        
        const expense=await Expense.create({
            title,
            amount,
            type
        })
        return res.status(200).json({
            message:"Expense added sucessfully",
            data:expense
        })


    } catch (err) {
      console.log("Error", err);
      return res.status(500).json({
        message: "Cannot add a expense",
      });
    }
}
const deleteExpense=async(req,res)=>{
   try{
  
    console.log("ID",req.params.id);
    const newExpense=await Expense.findByIdAndDelete(req.params.id);
    if(!newExpense){
        return res.status(500).json({
          message: "Expense id is wrong",
        });
    }
    return res.status(200).json({
        message:"Expense deleted sucessfully",
        data:newExpense
    })


   }
   catch(err){
    console.log("Error:",err);
    return res.status(500).json({
        message:"Expense not deleted"
    })
   }

}
const updateExpense=async(req,res)=>{
     try {
        const Id=req.params.id;
       

        const newExpense = await Expense.findByIdAndUpdate(
          Id,
          req.body,
          { new: true }
        );

        return res.status(200).json({
            message:"Expense updated sucessfully",
            data:newExpense
        })

      
     } catch (err) {
       console.log("Error:", err);
       return res.status(500).json({
         message: "Expense not updated",
       });
     }

}

const getSingleExpense=async(req,res)=>{
    try{
        const id=req.params.id;
        const newExpense=await Expense.findById(id);

        res.status(201).json({
            message:"Single expense got sucessfully",
            data:newExpense
        })
    }
    catch(err){
        console.log("Error:", err);
        return res.status(500).json({
          message: "Can't get single response",
        });
    }
}
module.exports={getAllExpenses,addExpense,deleteExpense,updateExpense,getSingleExpense};