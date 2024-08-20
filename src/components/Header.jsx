import React from 'react'
import { RiSearchLine } from "react-icons/ri";
import { Avatar } from '@mantine/core';

function currentDate() {
  const theDate = new Date();

  const day = theDate.getDate();
  const month = theDate.toLocaleString('default', { month: 'short' });
  const year = theDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}





function Header(props) {
  return (
    <div className='flex-main w-full gap-x-10 mb-8'>
      <div className='flex justify-between items-baseline w-[50%]'>
        <h1 className='text-2xl font-semibold'>{props.title}</h1>

        {/* Date goes in here */}
        <p className="text-sm">{currentDate()}</p>
      </div>
      <div className='flex-main w-[50%] gap-x-16'>
        <div className="w-full flex justify-items-start items-center gap-x-2 rounded-md bg-search p-1">
          <RiSearchLine size={20} className='text-secondary' />
          <input type="text" placeholder="Search" className="bg-transparent text-base placeholder:text-secondary w-full border-none focus:outline-none " />
        </div> 
        <Avatar
          size="md"
          radius="xl"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        />
      </div>
    </div>
  )
}

export default Header