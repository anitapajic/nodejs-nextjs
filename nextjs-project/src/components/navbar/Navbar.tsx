"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useUser } from '@/contexts/UserContext';
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { logout } from '@/services/userService';

type MenuOption = {
  label: string;
  href: string;
};

type NavbarProps = {
  menuOptions: MenuOption[];
};

const Navbar: React.FC<NavbarProps> = ({ menuOptions }) => {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    const response = await logout();
    
    if(response.ok){
      setUser(null);
      router.push('/login');
    }
    
  }
  return (
    <nav className="py-5 bg-black text-white text-xl font-sans font-semibold border-b border-solid border-white text-center">
      <ul className="flex items-center justify-center w-full space-x-20">
          {menuOptions.map((option, index) => (
            <li key={index} className="group">
              {option.label === "Log Out" ? (
                <a href={option.href} onClick={handleLogout}>
                  <div className='hover:scale-110 transition-transform duration-200 text-white bg-gray-300/40 text-decoration-none group-hover:bg-gray-100/40 group-hover:text-white py-2 px-2 rounded-lg  flex items-center justify-center gap-1 text-lg rounded-br-lg'>
                  <FaArrowRightFromBracket />
                    <span className="ml-1 mb-1">{option.label}</span>
                  </div>
                </a>
              ) : (
                <Link href={option.href}>
                  <div className='hover:scale-110 transition-transform duration-200'>
                    <span className=" text-white text-decoration-none group-hover:bg-gray-100/40 group-hover:text-white py-3 px-4 rounded-lg">{option.label}</span>
                  </div>
                </Link>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
