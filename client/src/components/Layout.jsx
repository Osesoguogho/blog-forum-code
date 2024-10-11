import React, {useState} from 'react';
import { Outlet, NavLink, redirect, useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import usePreferMode from './usePrefermode';
import Footer from './Footer';
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
 


 const Layout = () => {
   const [display, setIsDisplay] = useState(false);
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#ed0e0e"
    };
    const [colorTheme, setTheme] = usePreferMode();
    const [darkTheme,  setDarkTheme] = useState(colorTheme==="light"? true: false);

    const toggleDarkMode = () => {
        setTheme(colorTheme);
        setDarkTheme(!darkTheme);
    };
    const navigate = useNavigate();

  return (
    <div className='flex flex-col light dark:bg-slate-900 text-white'>
         <nav className="host-nav h-10rem bg-[#1A3636] flex justify-between align-center p-6 text-slate-100"  >
           
           <NavLink
                to="/"
                end 
              className= "m-3 font-extrabold"
            >
                Naija247
            </NavLink>
            <div className="flex justify-between hidden md:block">
           <NavLink
                to="about"
                end 
                style={({ isActive }) => isActive ? activeStyles : null}
                className="m-3"
            >
                About
            </NavLink>

            <NavLink
                to="contact"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                Contact Us
            </NavLink>
            
            <NavLink
                to="/"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                Blog
            </NavLink>
            <NavLink
                to="login"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
               Sign in 
            </NavLink>
            <NavLink
                to="register"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                Sign up
            </NavLink>
            <NavLink
                to="user_posts"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                Your posts
            </NavLink>
        <button className="hover:bg-red-600 hover:text-white text-red-500 rounded-xl p-3" onClick={ () => {localStorage.removeItem("token");
        navigate("/");
        setIsDisplay(false)
        }}>sign out</button>
        {/* <button onClick={toggleDarkMode}>dark</button> */}
            </div>
            <button onClick={() => setIsDisplay(!display)} className={`md:hidden ${display? "absolute top-2 right-2" : ""} border-3 w-8 h-8 hover:border-2`}>{display? <IoClose className='w-full h-full' /> :<IoMdMenu className='w-full h-full'/>}</button>
            {/* <button onClick={toggleDarkMode(true)}>dark</button>
            <button onClick={toggleDarkMode(false)}> light </button> */}
          <button className='absolute top-1 left-2' onClick={toggleDarkMode}>{darkTheme ? <MdOutlineWbSunny/> : <FaMoon/>}</button>
            {/* Set the toggle navbar on small device */}

            {display &&   <div className="container flex flex-col justify-between h-3/4 w-100 md:hidden text-center">
           <NavLink
                to="about"
                end 
                style={({ isActive }) => isActive ? activeStyles : null}
                className="my-3 py-3 hover:border-b-2 "
                onClick={() => setIsDisplay(false)}
            >
                About
            </NavLink>

            <NavLink
                to="contact"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "my-3 py-3 hover:border-b-2"
                onClick={() => setIsDisplay(false)}
            >
                Contact Us
            </NavLink>
            
            <NavLink
                to="/"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "my-3 py-3 hover:border-b-2"
                onClick={() => setIsDisplay(false)}
            >
                Blog
            </NavLink>
            <NavLink
                to="login"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "my-3 py-3 hover:border-b-2"
                onClick={() => setIsDisplay(false)}
            >
               Sign in 
            </NavLink>
            <NavLink
                to="register"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "my-3 py-3 hover:border-b-2"
                onClick={() => setIsDisplay(false)}
            >
                Sign up
            </NavLink>
            <NavLink
                to="user_posts"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "my-3 py-3 hover:border-b-2"
                onClick={() => setIsDisplay(false)}
            >
                Your posts
            </NavLink>
        <button className=" rounded-xl my-3 py-3 text-red-600 text-lg hover:bg-red-500 hover:text-white" onClick={ () => {localStorage.removeItem("token");
        navigate("/");
        setIsDisplay(false);
        }}>sign out</button>
        {/* <button onClick={toggleDarkMode}>dark</button> */}
            </div> }
            
       </nav>
    <main className='grow'>
        <Outlet/>
    </main>
    <footer>
     <Footer/>
    </footer>

    </div>
  )
};

export default Layout;