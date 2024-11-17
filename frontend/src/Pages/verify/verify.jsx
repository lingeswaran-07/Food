import React, { useContext} from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
const verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId =searchParams.get("orderId");
    const {url} =useContext(StoreContext)
    const navigate=useNavigate();

    const verifypayment=async()=>{
        const response= await axios.post(url+"api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders")

        }
        else{
            navigate("/");
        }
    }
  return (
    <div className='verify' onClick={verifypayment}>
      
    </div>
  )
}

export default verify;
