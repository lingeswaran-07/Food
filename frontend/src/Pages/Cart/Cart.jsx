import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartitems, food_list, removeFromCart, getTotalCartAmout, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmout(); // Get subtotal
  const deliveryFee = subtotal === 0 ? 0 : 2; // Calculate delivery fee
  const total = subtotal + deliveryFee; // Calculate total

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartitems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>Rs.{item.price * cartitems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{subtotal}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>Rs.{deliveryFee}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{total}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
