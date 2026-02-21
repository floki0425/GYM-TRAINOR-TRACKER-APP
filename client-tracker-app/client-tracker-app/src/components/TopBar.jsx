import React from 'react'
import dumbell from '../assets/dumbell.png'
import search from '../assets/search.png'

const TopBar = () => {
  return (
    <div className='bg-gray-200'>
      <div className="flex  gap-20 py-2 px-4">
            <div className='flex  w-full max-w-80   items-center'>
                 <img src={dumbell} alt="asd" className='w-7 mr-2'/>
                 <p  className='font-bold text-gray-700'> Trainer Progress Tracker</p>
            </div>
            <div className='flex bg-white border border-gray-300 rounded item-center  w-full  '>
                <img src={search} alt="asd" className='w-8 py-2 px-2 '/>
                <input  type="text" placeholder='Search..' className=" w-full max-w-900 focus:outline-none  cursor-pointer"/>
            </div>
         </div>
    </div>
  )
}

export default TopBar
