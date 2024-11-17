import './List.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({url}) => {
  const [list,setList]=useState([]);
 
  const fetchlist=async()=>{
    const response =await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if(response.data.success){
      setList(response.data.data); 
    }
    else{
      toast.error("Error");
    }
  }

  const removefood=async(foodId)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchlist();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Error");
    }
  }
  useEffect(()=>{
    fetchlist();
  },[])
  return (
    <div className='list add flex-col'>
    <p>All foods List</p>
    <div className='list-table'>
      <div className='list-table-format title'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>

      </div>
      {list.map((item,index)=>{
        return(
          <diV key={index} className="list-table-format">
          <img src={`${url}/images/`+item.image}/>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p onClick={()=>removefood(item._id)} className='cursor'>X</p>

          </diV>
        )
      })}
    </div>
    </div>
  )
}

export default List
