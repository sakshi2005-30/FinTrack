import axios from "axios"
import {useState,useEffect} from "react";
import { X } from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";

const AddExpense = () => {
  const navigate=useNavigate();
  const [title,setTitle]=useState("");
  const [amount,setAmount]=useState(null);
  const [type,setType]=useState("");
  const {id}=useParams();

  const editExpense=!!id;


  useEffect(()=>{
    const fetchExpenses=async()=>{
      try{
          if(editExpense){
          const res=await axios.get(`/expense/api/expenses/${id}`);
          const newExpense=res.data.data;

          setTitle(newExpense.title);
          setAmount(newExpense.amount);
          setType(newExpense.type);
        }
      }
      catch(err){
        console.log("Error:",err);
      }
      
    }
    fetchExpenses();
  },[id,editExpense]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(editExpense){
        const result=await axios.put(`/expense/api/expenses/${id}`,{
          title,
          amount:Number(amount),
          type
        }
        )

       // setExpenseList((prev)=>prev.map((expense)=>expense._id===editExpense._id?result.data.data:expense))
      }
      else{
        const newExpense = await axios.post("/expense/api/expenses", {
          title,
          amount:Number(amount),
          type,
        });
        // setExpenseList((prev) => [newExpense.data.data, ...prev]);
        // console.log("Success expense added");
      }
        navigate("/");
      // closeModal()
    

    }
    catch(err){
      console.log("Error",err);
    }
  }
  console.log("title:",title);
  console.log("amount:",amount)
  console.log("Type:",type);
  return (
    <div className="fixed inset-0 flex justify-center items-center max-auto my-10 z-50  ">
      <div className="max-w-md border flex flex-col justify-center items-center  border-gray-200 rounded-lg shadow-md bg-white">
        <div className="my-4 mx-4 w-90 relative">
         
          <X className="absolute right-2 top-1 text-gray-400 h-8 w-8 p-1 hover:bg-gray-200 hover:rounded-full cursor-pointer" onClick={()=>navigate("/")}/>
          <h1 className="text-2xl font-medium text-center text-blue-500 mb-4">
            {" "}
            {editExpense?"Edit Expense": "Add Expense"}
           
          </h1>

          <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Enter title "
              onChange={(e) => setTitle(e.target.value)}
              className="px-2 py-2 outline-none border  border-gray-400 rounded-lg focus:ring focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Enter amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="px-2 py-2 outline-none border  border-gray-400 rounded-lg focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter type"
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="px-2 py-2 outline-none border  border-gray-400 rounded-lg focus:ring focus:ring-blue-500"
            />
            <button className="px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer" >
             {editExpense?"Update":"Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpense