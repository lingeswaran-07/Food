import express from "express";
import authMiddleware from "../middleware/auth.js";

import { placeOrder, userorders, verifyorder } from "../controllers/orderController.js";

const orderRouter=express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyorder)
orderRouter.post("/userorder",authMiddleware,userorders)

export default orderRouter;