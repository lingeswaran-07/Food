import { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onSubmithandler = async (event) => {
        event.preventDefault();
        
        // Frontend validation for the price field
        const priceValue = Number(data.price);
        if (isNaN(priceValue) || priceValue <= 0) {
            toast.error("Please enter a valid price");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", priceValue); // Ensure price is a number
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(false);
                toast.success(response.data.message);
            }
            else{
                toast.error(response.data.error);
            }
        } catch (error) {
            toast.error("Error adding the product");
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmithandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" />
                    </label>
                    <input type='file' onChange={(e) => setImage(e.target.files[0])} id='image' hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} value={data.category} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20' min="1" required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
