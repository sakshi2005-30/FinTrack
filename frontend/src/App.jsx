import React from 'react'
import AddExpense from './components/AddExpense'
import Home from './components/Home'
import {Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <div className="min-h-screen ">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element ={<AddExpense/>}/>
        <Route path="/edit/:id" element={<AddExpense/>}/>
      </Routes>      
    </div>
  )
}

export default App