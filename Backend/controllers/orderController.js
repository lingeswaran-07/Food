import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from 'stripe';  

const stripe = new Stripe('sk_test_51QBJ1o042u4ST8PonpkC59zfcM6mr4Tu0Y48E1WpaWKFiHB9jEVkAEHcAPzns9t05ma3lQOSxcp06qwrsNXqo3KA00MvTZSZRP');  // Initialize Stripe with your secret key

const placeOrder = async (req, res) => {
    console.log("Place order is triggered");
    const frontend_url = "http://localhost:5173";
    console.log("Request", req.body);
  
    try {
      // Save the order in the database
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
      });
      await newOrder.save();
  
      // Clear the user's cart
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
  
      // Create Stripe line items
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Stripe expects amounts in smallest currency unit (e.g., paise for INR)
        },
        quantity: item.quantity,
      }));
  
      // Add delivery charge
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Delivery charges" },
          unit_amount: 200, // Delivery charge in smallest unit
        },
        quantity: 1,
      });
  
      // Create a Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder.id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder.id}`,
      });
  
      console.log("Stripe session created:", session.url);
      res.json({
        success: true,
        message: "Order has been placed",
        session_url: session.url, 
      });
    } catch (error) {
      console.error("Error processing order:", error);
      res.json({ success: false, message: "Error processing order" });
    }
  };
  

// Verify order function
const verifyorder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// Get user orders
const userorders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

export { placeOrder, verifyorder, userorders };
