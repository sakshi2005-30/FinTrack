import {  Pencil,Trash } from "lucide-react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {useState} from "react"

const ExpenseList = ({expenseList,setExpenseList,filterType,loading,searchTitle}) => {
  const [updateTitle,setUpdateTitle]=useState("");
  const[updateAmount,setUpdateAmount]=useState(null);
  const[updateType,setUpdateType]=useState("");
  const [income,setIncome]=useState(0);
  const navigate=useNavigate();
  const filtered =
    filterType === "all"
      ? expenseList
      : filterType === "income"
      ? expenseList.filter((item) => item.type === "income")
      : expenseList.filter((item) => item.type === "expense");

  const filteredList=searchTitle===""?filtered:filtered.filter((item)=>item.title.includes(searchTitle))
 const handleDelete=async(id)=>{
 
    try{
      const deleteExpense=await axios.delete(`/expense/api/expenses/${id}`);
      
      setExpenseList((prev)=>prev.filter((expense)=>expense._id!==id));
    }
    catch(err){
      console.log("Error:",err);
    }
 }




  return (
    <div className="mt-16 ">
      {loading && <p className="text-2xl text-center font-bold">Loading</p>}
      {filteredList.length === 0 && (
        <p className="text-xl text-center font-medium">No expenses added yet</p>
      )}
      
        {filteredList.length !== 0 && (
          <h1 className="flex justify-center text-2xl font-bold text-blue-500">
            {filterType==="all"?"All Expenses":filterType=="income"?"Income":"Expenses"}
          </h1>
        )}
    

      <div className="flex">
        <div className="mx-auto">
          {filteredList && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-14 lg:gap-18 mt-6">
              {filteredList.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border  bg-blue-100 border-blue-100 shadow-md rounded-lg"
                >
                  <h1 className="text-xl text-center font-bold text-blue-500 mb-2">
                    {item.title}
                  </h1>
                  <p className="font-medium px-4 mb-4 ">
                    Amount: {item.amount}
                  </p>
                  <p className="font-medium px-4 mb-4 ">Type: {item.type}</p>
                  <div className="flex justify-between px-4 ">
                    <button
                      className="bg-pink-200 w-10 h-10 flex justify-center items-center rounded-lg  cursor-pointer "
                      onClick={() => {
                        navigate(`/edit/${item._id}`);
                      }}
                    >
                      <Pencil className="fill-blue-500 text-blue-500 hover:fill-blue-300  w-5 h-5" />
                    </button>

                    <button
                      className="bg-green-200 w-10 h-10 flex justify-center items-center rounded-lg  cursor-pointer "
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash className="fill-red-500 text-red-500 hover:fill-red-300  w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseList