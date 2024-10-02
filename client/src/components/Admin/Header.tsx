import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '@/redux/Authorization/authSlice';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = async () =>{
    try {
      await axios.get("/api/v1/auth/logout-admin")
        dispatch(signOut());
        navigate("/admin-logIn", { replace: true });
      
    } catch (error: unknown) {  
      toast.error(error instanceof Error ? error.message : "Unknown error occurred");
    } 
  }
  return (
    <div className="flex justify-end p-4 bg-gray-200">
      <div className="relative">
        <FaUserAlt className="cursor-pointer text-xl" onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
            <a href="student-profile" className="block px-4 py-2 text-black hover:bg-gray-300">Profile</a>
            {/* <span className="block px-4 py-2 text-black hover:bg-gray-300" onClick={handleClick}></span> */}
            <span onClick={handleClick} className=" cursor-pointer block px-4 py-2 text-black hover:bg-gray-300">Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
