import React, {useEffect, useState} from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useContext } from 'react'
import { TaskContext } from '../Contexts/TaskContext';
import axios from 'axios';
import { api_url } from '../utils/constants';
const UpdateTask = () => {

    const {selectElement,setUpdateTaskToggle, setSelectElement, setRefreshTasks,refreshTasks} = useContext(TaskContext);
    const [toggle, setToggle] = useState(false);

    

    useEffect(()=>{

       function clickHandler(){

        selectElement.forEach(async (ele, idx) => {
          const res = await axios.delete(`${api_url}/deleteTask?title=${encodeURIComponent(ele)}`);

          
          setRefreshTasks(!refreshTasks);
        })
        }
    
    if(selectElement.length === 0)
    {
      setUpdateTaskToggle(false);
    }
    else
    {
      setUpdateTaskToggle(true);
      
    }

    if(toggle)
    {
      clickHandler();
      setSelectElement([]);
      setToggle(false);
      setUpdateTaskToggle(false);
    }

    },  [toggle, selectElement])

    
    function statusHandler(e){
      

      selectElement.forEach(async (ele, idx) => {
        try{
        const res = await axios.post(`${api_url}/updateStatus`,  {title: ele, status : e.target.value });
        
        

        if(res)
        {
          setRefreshTasks(!refreshTasks);
          setSelectElement([]);
      setToggle(false);
      setUpdateTaskToggle(false);
        }
        }
        catch(e)
        {
          console.log(e);
        }
       
      })
    }

  return (
    <div className=' bg-[#1A1C20] text-white flex justify-between py-4 border-0 rounded-3xl w-full px-2'>
        <div className='flex justify-center gap-2 items-center border border-white rounded-full px-2 py-1'>
            <div className=''>{selectElement?.length || 0} Tasks Selected</div>
            <div onClick={()=> setUpdateTaskToggle(false)}> <RxCross2 /> </div>
        </div>
        <div className='flex gap-1'>
        <div className='text-sm  bg-[#8d8a8a50] text-black rounded-full flex items-center justify-center'>
          <select name="status" id="status" className='text-white' onChange={(e)=> statusHandler(e)}>
            <option value="" selected disabled hidden>Status</option>
            <option className='text-black' value="todo">TO-DO</option>
            <option className='text-black' value="in-progress">In-Progress</option>
            <option className='text-black' value="completed">Completed</option>
          </select>
        </div>
        <div onClick={() => setToggle(true)} className='px-2 py-1 bg-[#ff353554] text-red-600 rounded-full'>Delete</div>
        </div>
    </div>
  )
}

export default UpdateTask;