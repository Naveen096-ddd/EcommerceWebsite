import { React } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/loginpage/Loginpage';
import SignupPage from './components/signuppage/SignupPage';
import UserDash from './components/dashboard/userDashboard/UserDashboard';
import AdminDashboard from './components/dashboard/adminDashboard/AdminDashboard';
import Home from './components/pages/Home/Home';
import Aboutus from './components/pages/Home/aboutus/Aboutus';
import ContactUs from './components/pages/Home/contactus/ContactUs';
import Categories from './components/pages/Home/catagories/Catagories';
import Shop from './components/pages/Home/shop/Shop';
import Blog from './components/pages/Home/blog/Blog';
import { BlogsProvider } from './components/context/BlogContext';
import { CartProvider } from './components/context/CartContext';
function App() {
  return (
    <>
    <CartProvider>
    <BlogsProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/userdash' element={<UserDash/>}/>
        <Route path='/admindash' element={<AdminDashboard/>}/>
      </Routes>
    </Router>
    </BlogsProvider>
    </CartProvider>
    </>
  )
}

export default App
