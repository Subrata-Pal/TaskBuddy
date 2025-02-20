import React, { useState } from 'react'
import checkmark from '../assets/checkmark-circle.png'
import { useContext } from 'react'
import { TaskContext } from '../Contexts/TaskContext';
import { BsThreeDotsVertical } from "react-icons/bs";


const ListViewComplete = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const { setViewTaskTitle,
      setViewTask, completedTask, updateTaskToggle, setUpdateTaskToggle,  selectElement, setSelectElement} = useContext(TaskContext);


    function handleClick(e){
      if(e.target.checked){
      setSelectElement((prev) => [...prev, e.target.value])
      } else {
          setSelectElement(prev => prev.filter(item => item!== e.target.value))
      }
      
      setUpdateTaskToggle(true);
  }

    const handleCheckboxChange = (item) => {
        // Toggle the checkbox value in the state
        setSelectedItems((prev) => {
            const exists = prev.some((selected) => selected.title === item.title);
            if (exists) {
              // Remove the object if it exists
              return prev.filter((selected) => selected.title !== item.title);
            } else {
              // Add the object if it doesn't exist
              return [...prev, item];
            }
          });

        
      };


    return (
      <div >
          {
              completedTask.length == 0 ? 
              <div className='w-full h-[30vw] md:h-[20vw] bg-[#F1F1F1]'>
                      <div>
  
                          <div className='flex justify-center items-center h-[20vw]'>No Tasks Completed</div>
                      </div>
                  
              </div> : <div>
            {
                completedTask.map((item, index) => (
                    <div
                                  key={index}
                                  className="w-full bg-[#F1F1F1] px-2 gap-2 py-4 border-b-[1px] border-gray-300"
                                >
                                  <div className="flex justify-between">
                                    <div className="flex gap-2 items-center">
                                      <input
                                        type="checkbox"
                                        name={item.title}
                                        id={item.title}
                                        value={item.title}
                                        onClick={(e) => handleClick(e)}
                                      />
                                      <div>
                                        <img src={checkmark} alt="" />
                                      </div>
                                      <label className='line-through' htmlFor={item.title}>{item.title}</label>
                                    </div>
                                    <div onClick={() => {setViewTask(true); 
                                    setViewTaskTitle(item.title)}}><BsThreeDotsVertical /></div>
                                  </div>
                                </div>
                ))
            }
          </div>
          }

      
      </div>
    )
}

export default ListViewComplete