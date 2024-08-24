import { Avatar } from '@mantine/core';
import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';


const lastThreeTransactions = [
  {
    id: 1,
    title: "Received",
    amount: 1000,
    date: new Date()
  },
  {
    id: 2,
    title: "Deposit",
    amount: 1000,
    date: new Date(2024, 8, 22),
  },
  {
    id: 3,
    title: "Sent",
    amount: 1000,
    date: new Date(2024, 2, 22),
  },
]


function currentDate(theDate) {
  const day = theDate.getDate();
  const month = theDate.toLocaleString('default', { month: 'short' });
  const year = theDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}


export default function TransactionList() {
  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Recents</h1>
        <NavLink to={'/dashboard/transactions'} className={"text-sm underline flex items-center gap-1"}>
          <p>View all</p> <FaArrowRight />
        </NavLink>
      </div>
      <div className="w-full">
        {lastThreeTransactions.map(transaction => (
          <div key={transaction.id} className="border-2 border-secondary rounded-lg p-4 mb-1 w-full flex justify-between items-center">
            <div className='flex items-center justify-start gap-2'>
              <Avatar />
              <div className='text-left'>
                <p className='text-sm font-bold'>{transaction.title}</p>
                <p className='text-xs font-medium text-secondary2'>₦{transaction.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
