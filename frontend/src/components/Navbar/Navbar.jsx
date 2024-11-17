import React, { useContext } from 'react';
import './Navbar.css';
import { useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmout,token,setToken} = useContext(StoreContext);
  
  const navigate=useNavigate();
  
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  return (
    <div className='navbar'>
      <Link to='/'><h1>Foody</h1></Link>
      <ul className='navbar-menu'>
        <Link to='/' className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>Home</Link>
        <a href="#explore-menu" className={menu === "Menu" ? "active" : ""} onClick={() => setMenu("Menu")}>Menu</a>
        <a href="#app-download" className={menu === "Mobile-app" ? "active" : ""} onClick={() => setMenu("Mobile-app")}>Mobile-app</a>
        <a href="#footer" className={menu === "Contactus" ? "active" : ""} onClick={() => setMenu("Contactus")}>Contact Us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt='search'/>
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt='cart' /></Link>
          {getTotalCartAmout() > 0 && <div className='dot'></div>}  {/* Show dot only when items exist */}
        </div>
        {!token?(<button onClick={() => setShowLogin(true)}>Sign in</button>
        ): <div className='navbar-profile'>
        <img src={assets.profile_icon}/>
        <ul className='nav-profile-dropdown'>
        <li><img src={assets.bag_icon}/><p>Orders</p></li>
        <hr/>
          <li><img src={assets.logout_icon}/><p>Logout</p></li>
        </ul>
        
        </div>}
        
      </div>
    </div>
  )
}

export default Navbar;
