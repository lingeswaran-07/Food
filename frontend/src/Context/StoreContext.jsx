import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartitems, setCartitems] = useState({});
    const url = "https://food-otli.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addtocart = async (itemId) => {

        console.log("An item is being added to card with item id",itemId);
        // Add to local state
        setCartitems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, // Add or increment item
        }));

        // If token is available, add to backend
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        console.log("Item removal reqeust has been received from item id",itemId);
        setCartitems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmout = () => {
        let totalAmount = 0;
        for(const it in cartitems){
            console.log(it);
        }
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                const itemInfo = food_list.find((product) => String(product._id) === String(item));
                console.log("Item info",itemInfo);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartitems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    useEffect(() => {
        async function localData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await localCartData(storedToken);
            }
        }
        localData();
    }, []);

    const localCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartitems(response.data.cartData);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const contextValue = {
        food_list,
        cartitems,
        setCartitems,
        addtocart,
        removeFromCart,
        getTotalCartAmout,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
