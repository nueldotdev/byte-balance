import React from 'react'
import { BsArrowDownLeft } from 'react-icons/bs';
import { HiMiniArrowDownCircle, HiMiniArrowUpCircle } from 'react-icons/hi2';
import { GrMoney } from "react-icons/gr";


const cash = [
  { label: "in", amount: 12000, icon: <HiMiniArrowDownCircle size={17} className="text-green-500" /> },
  { label: "balance", amount: 10000, icon: <GrMoney size={16} className="text-primary" /> },
  { label: "out", amount: 1700, icon: <HiMiniArrowUpCircle size={17} className="text-blue-500" />  }
]

const WalletBox = () => {
  return (
    <div className='w-full h-full flex flex-col gap-y-2'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Wallet</h1>
      </div>
      <div className='w-full flex flex-col h-full'>
        <div className='bg-secondary h-full flex justify-between items-center rounded-lg py-3 mb-3'>
          {cash.map((item, index) => (
            <div key={index} className={`p-2 text-tertiary text-center w-full ${index == 1 ? "border-x-[1px] border-x-secondary2" : ""}`}>
              <div className='flex justify-center'>
                <p className='text-sm'>{item.label}</p>
                {item.icon}
              </div>
              <p className={`font-semibold ${item.label == 'balance' ? "text-3xl" : "text-xl"}`}>
                ₦{item.amount.toLocaleString("en-US")}
              </p>
            </div>
          ))}
        </div>

        <div className='bg-transparent flex justify-between items-center rounded-lg gap-2'>
          <div className='py-2 text-tertiary text-center w-full'>
            <button className='p-3 w-full text-xl bg-green-500 rounded-lg'>
              <p>Deposit</p>
            </button>
          </div>
          <div className='py-2 text-tertiary text-center w-full'>
            <button className='p-3 w-full text-xl bg-blue-500 rounded-lg'>
              <p>Transfer</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletBox;