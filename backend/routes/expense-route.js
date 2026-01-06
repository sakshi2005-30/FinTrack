const express=require("express");
const router=express.Router();
const {getAllExpenses,addExpense,deleteExpense,updateExpense,getSingleExpense}=require("../controllers/expense-controller")
//get all expense
router.get("/expenses",getAllExpenses)
//add new expense
router.post("/expenses",addExpense)
//delete a expense
router.delete("/expenses/:id",deleteExpense)
//update a expense
router.put("/expenses/:id",updateExpense)
//get a single expense
router.get("/expenses/:id",getSingleExpense)

module.exports=router;