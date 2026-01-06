import React from 'react'
import AddExpense from './AddExpense'
import {useState,useEffect} from "react"
import ExpenseList from './ExpenseList'
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const location=useLocation();
 
  const [addExpenseOpen,setAddExpenseOpen]=useState(false)
   const [expenseList, setExpenseList] = useState([]);
  const [editExpense,setEditExpense]=useState(null);
  const [loading,setLoading]=useState(false);
  const [filterType,setFilterType]=useState("all");
  const [filterOpen,setFilterOpen]=useState(false);
  const [searchTitle,setSearchTitle]=useState("");

   const fetchAllExpenses = async () => {
    setLoading(true);
     try {
       const list = await axios.get("/expense/api/expenses");
       setExpenseList(list.data.data);
       setLoading(false);
     } catch (err) {
       console.log("Error", err);
        setLoading(false);
     }
   };
   useEffect(() => {
     fetchAllExpenses();
   }, [location.pathname]);
   console.log("expenseList:", expenseList.data);
   const totalIncome = expenseList
     .filter((expense) => expense.type === "income")
     .reduce((acc, item) => acc + item.amount, 0);
   const totalExpense = expenseList
     .filter((expense) => expense.type === "expense")
     .reduce((acc, item) => acc + item.amount, 0);
   const Balance = totalIncome - totalExpense;
  return (
    <div className="relative">
      <h1 className=" inset-0 flex justify-center text-3xl font-bold text-blue-700 mt-4">
        Expense Tracker
      </h1>
      <button
        className="px-4 py-2 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 cursor-pointer absolute right-20 flex justify-center items-center"
        onClick={() => {
          navigate("/add");
        }}
      >
        Add Expense
      </button>
      {addExpenseOpen && <AddExpense editExpense={editExpense} />}
      <div className="my-20 mx-20 flex justify-between items-center">
        <p className="px-6 py-4 bg-blue-200 rounded-lg text-xl font-medium text-blue-700">
          Total Income:
          <span className="text-black text-lg">${totalIncome}</span>
        </p>
        <p className="px-6 py-4 bg-blue-200 rounded-lg text-xl font-medium text-blue-700">
          Total Expense:
          <span className="text-black text-lg">${totalExpense}</span>
        </p>
        <p className="px-6 py-4 bg-blue-200 rounded-lg text-xl font-medium text-blue-700">
          Balance:<span className="text-black text-lg">${Balance}</span>
        </p>
      </div>
      {/* search */}
      <div className="flex justify-center mb-6  ">
        <input type="text"
        placeholder="Search.."
        className="  w-md px-4 py-3  outline-none bg-gray-100 rounded-lg shadow-md focus:border-2 focus:border-blue-500"  onChange={(e)=>setSearchTitle(e.target.value)}/>
      </div>
      {/* filter by category */}
      <div className="absolute left-10  ">
        <button
          className=" px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filter By Category
        </button>
        {filterOpen && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-md">
            <div className="flex flex-col">
              <button
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border border-gray-200 font-medium "
                onClick={() =>{ setFilterType("all")
                  setFilterOpen(false)
                }}
              >
                All
              </button>
              <button
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border border-gray-200 font-medium z-20 "
                onClick={() => {setFilterType("income")
                  setFilterOpen(false);
                }}
              >
                Income
              </button>
              <button
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border border-gray-200 font-medium "
                onClick={() => {setFilterType("expense")
                  setFilterOpen(false);
                }}
              >
                Expense
              </button>
            </div>
          </div>
        )}
      </div>

      <ExpenseList
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        setAddExpenseOpen={setAddExpenseOpen}
        setEditExpense={setEditExpense}
        loading={loading}
        filterType={filterType}
        searchTitle={searchTitle}
      />
    </div>
  );
}

export default Home