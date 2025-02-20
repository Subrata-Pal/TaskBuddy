import React, { useContext, useState, useEffect } from 'react'
import { TaskContext } from '../Contexts/TaskContext';
import { FiLogOut } from "react-icons/fi";
import axios from 'axios';
import { api_url_user } from "../utils/constants";
import {useNavigate} from "react-router-dom"

const Header = () => {
  const user = localStorage.getItem('user');
  const image_url = JSON.parse(user).photoURL;
  const [toggle, setToggle] = useState(false);

  const {taskToggle, viewTask} = useContext(TaskContext);
  const navigate = useNavigate();
  
  async function logoutHandler()
    { 
      localStorage.clear();
      navigate('/login')

    }

  
  return (
    <div className={`${(taskToggle) ===  true  ? ' bg-gray-500' : ''}`}>
      <div className='w-full bg-[#dec8e2] flex justify-between items-center px-4 py-2'>
        <div className='text-xl'>TaskBuddy</div>
        <div className='w-8 h-8 rounded-full bg-red-300 overflow-hidden ' onClick={() => setToggle((prev) => !prev)}>
          <img src={image_url} alt=""/>

          {
            toggle && <div onClick={()=> logoutHandler()} className="absolute right-2 bg-white px-2 py-1 top-12 flex items-center gap-2 rounded-xl">
              <div>Logout</div>
              <div><FiLogOut />
              </div>
            </div>
        }
        </div>
        
      </div>
    </div>
  )
}

export default Header