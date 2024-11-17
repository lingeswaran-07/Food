import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRoute.js";
const app=express();


app.use(express.json());
app.use(cors());

const port=process.env.PORT || 4000;

connectDB();

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("Api working");
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});


// mongodb+srv://lingeswaranv:<db_password>@cluster0.hlzbjex.mongodb.net/?