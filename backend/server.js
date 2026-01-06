require("dotenv").config()
const express=require("express");
const app=express();
const connectToDB=require("./database/db");
 const router=require("./routes/expense-route")

const PORT=process.env.PORT;
app.use(express.json());
connectToDB();

app.use("/expense/api",router)

app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
})


