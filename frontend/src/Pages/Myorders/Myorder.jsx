import React, { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import './Myorders.css'
import { assets } from '../../assets/frontend_assets/assets';
const Myorder = () => {
    const {url,token}=useContext(StoreContext);
    const [data,setData]=useState([]);

    const fetchOrders=async ()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
    }

  return (
    <div className='my-orders' >
    <h2>My orders</h2>
    <div className='container'>
       {data.map((order,index)=>{
        return(
            <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} />
            <p>{order.items.map((item,index)=>{
                if(index===order.items.length-1){
                    return item.name+ " X "+item.quantity;
                }
                else{
                    return item.name+ " X "+item.quantity;

                }
                
            })}</p>
            </div>
        )

       })}

    </div>
      
    </div>
  )
}

export default Myorder
