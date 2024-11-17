import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id, name, price, description, image }) => {
    const { cartitems, addtocart, removeFromCart, url } = useContext(StoreContext);
    
    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
                {!cartitems[id] ? (
                    <img
                        className='add'
                        onClick={() => addtocart(id)} // Ensure the correct item ID is passed
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img
                            onClick={() => removeFromCart(id)} // Remove specific item
                            src={assets.remove_icon_red}
                            alt="Remove one from cart"
                        />
                        <p>{cartitems[id]}</p> {/* Show the count of that specific item */}
                        <img
                            onClick={() => addtocart(id)} // Add the specific item again
                            src={assets.add_icon_green}
                            alt="Add one more to cart"
                        />
                    </div>
                )}
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    );
};


export default FoodItem;
