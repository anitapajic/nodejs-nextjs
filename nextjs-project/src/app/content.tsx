"use client"
import { Footer } from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar"
import { useUser } from "@/contexts/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const menu = [
    { label: 'Home', href: '/' , visibility: 'all'},
    { label: 'Log In', href: '/login', visibility: 'logged out' },
    { label: 'Sign Up', href: '/signup', visibility: 'logged out' },
    { label: 'Contacts', href: '/contacts', visibility: 'logged in' },
    { label: 'Log Out', href: '/', visibility: 'logged in' },
  ];

export const Content = (props: any) => {
    const { user } = useUser();
    
    const filteredMenu = menu.filter((item) => 
      item.visibility === "all" || 
      (item.visibility === "logged in" && user) ||
      (item.visibility === "logged out" && !user)
    );

    return(
        <div  className="flex flex-col min-h-screen">
            <Navbar menuOptions={filteredMenu}/>
            <ToastContainer className="toast-container" />
            <div  className="flex-grow">
                {props.children}
            </div>
            <Footer/>
        </div>
    )
    }
