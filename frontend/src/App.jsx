import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import { Routes ,Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Placeorder from './Pages/Placeorder/Placeorder';
import Fooder from './components/Fooder/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import verify from './Pages/verify/verify';
import Myorder from './Pages/Myorders/Myorder';
const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar  setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/verify' element={<verify/>}/>
        <Route path='/myorders' element={<Myorder/>}/>
      </Routes>
    </div>
    <Fooder/>
    </>

  );
};

export default App;
