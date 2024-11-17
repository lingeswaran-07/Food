import React, { useContext, useEffect, useState } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Placeorder = () => {
  const { getTotalCartAmout, token, food_list, cartitems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    try {
      const name = event.target.name;
      const value = event.target.value;
  
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } catch (error) {
      console.error("Error updating input field:", error);
    }
  };
  

  const placeorder = async (event) => {
    console.log("placeorder triggered");
    event.preventDefault(); // Prevent default form submission
  
    let orderitems = [];
  
    // Collect valid cart items
    food_list.forEach((item) => {
      if (cartitems[item._id] > 0) {
        let itemInfo = { ...item }; // Avoid mutating itemInfo
        itemInfo["quantity"] = cartitems[item._id];
        orderitems.push(itemInfo);
      }
    });
  
    // Validate all fields
    for (const key in data) {
      if (!data[key].trim()) {
        alert(`Please fill the ${key} field.`);
        return; // Exit the function if a field is empty
      }
    }
  
    if (orderitems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    let orderdata = {
      address: data,
      items: orderitems,
      amount: getTotalCartAmout() + 2,
    };
  
    try {
      console.log("Making Requst");
      let response = await axios.post(url + "/api/order/place", orderdata, {
        headers: { token },
      });
      if (response.data.success) {
        console.log("Response URL", response.data);
        const { session_url } = response.data;
  
        // Redirect to Stripe payment session
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  };
  

  return (
    <form className="place-order" onSubmit={placeorder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip-code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmout()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>Rs.{getTotalCartAmout() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                Rs.{getTotalCartAmout() === 0 ? 0 : getTotalCartAmout() + 2}
              </b>
            </div>
          </div>
          <button type="submit">Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
