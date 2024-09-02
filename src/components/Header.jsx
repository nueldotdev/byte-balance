import React, {useContext} from 'react'
import { RiSearchLine } from "react-icons/ri";
import { Avatar } from '@mantine/core';
import { UserContext } from "../context/UserContext";

function currentDate() {
  const theDate = new Date();

  const day = theDate.getDate();
  const month = theDate.toLocaleString('default', { month: 'short' });
  const year = theDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}





function Header(props) {
  
  const { userDet, loading } = useContext(UserContext);

  return (
    <div className='flex-main w-full gap-x-10 mb-8'>
      <div className='flex justify-between items-baseline w-full'>
        <h1 className='text-2xl font-semibold'>{props.title}</h1>

        {/* Date goes in here */}
        <p className="text-sm">{currentDate()}</p>
      </div>
      <div className='flex-main gap-x-16'>
        {/* <div className="w-full flex justify-items-start items-center gap-x-2 rounded-md bg-search p-1">
          <RiSearchLine size={20} className='text-secondary' />
          <input type="text" placeholder="Search" className="bg-transparent text-base placeholder:text-secondary w-full border-none focus:outline-none " />
        </div>  */}
        <Avatar
          size="md"
          radius="xl"
          src={userDet.userImg}
        />
      </div>
    </div>
  )
}

export default Header