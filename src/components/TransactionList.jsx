import { Avatar } from '@mantine/core';
import React, {useContext} from 'react'
import { UserContext } from "../context/UserContext";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function currentDate(theDate) {
  const day = theDate.getDate();
  const month = theDate.toLocaleString('default', { month: 'short' });
  const year = theDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}


export default function TransactionList() {

  const { transactions } = useContext(UserContext);
  const [usedArr, setUsedArr] = useState([]);

  useEffect(() => {
    if (transactions.length > 3) { 
      let arr = transactions.slice(-3);
      setUsedArr(arr)
    } else {
      setUsedArr(transactions);
    }
  }, [transactions])

  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Recents</h1>
        <NavLink to={'/dashboard/transactions'} className={"text-sm underline flex items-center gap-1"}>
          <p>View all</p> <FaArrowRight />
        </NavLink>
      </div>
      <div className="w-full">
        {usedArr.map((transaction, index) => (
          <div key={index} className="border-2 border-secondary rounded-lg p-4 mb-1 w-full flex justify-between items-center">
            <div className='flex items-center justify-between gap-2 w-full'>
              <div>
                <h1 className='text-lg font-bold'>{capitalizeFirstLetter(transaction.transaction_type)}</h1>
              </div>
              <div>
                <p className='text-base font-medium text-secondary2'>₦{transaction.amount}</p>
                <p className='text-xs font-light text-sec_accent'>{currentDate(new Date(transaction.transaction_date))}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
