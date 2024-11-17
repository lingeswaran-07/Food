import { assets } from '../../assets/assets'
import './sidebar.css'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
    <div className='sidebar-options'>
        <NavLink  to='/add' className='option'>
            <img src={assets.add_icon}/>
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='option'>
            <img src={assets.order_icon}/>
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders'className='option'>
            <img src={assets.order_icon}/>
            <p>Orders</p>
        </NavLink>
    </div>
      
    </div>
  )
}

export default Sidebar