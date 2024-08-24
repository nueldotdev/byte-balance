import React, {useState} from 'react'
import { BsArrowDownLeft } from 'react-icons/bs';
import { HiMiniArrowDownCircle, HiMiniArrowUpCircle } from 'react-icons/hi2';
import { BiSolidCoinStack } from "react-icons/bi";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';


const cash = [
  { label: "in", amount: 12000, icon: <HiMiniArrowDownCircle size={17} className="text-green-500" /> },
  { label: "balance", amount: 10300, icon: <BiSolidCoinStack size={16} className="text-primary" /> },
  { label: "out", amount: 1700, icon: <HiMiniArrowUpCircle size={17} className="text-blue-500" />  }
]

const WalletBox = () => {
  const [depoModal, setDepoModal] = useState(false);
  const [transferModal, setTransferModal] = useState(false);

  const handleDepo = () => {
    setDepoModal(!depoModal)
  }
  const handleTransfer = () => {
    setTransferModal(!transferModal)
  }

  return (
    <div className='w-full h-full flex flex-col gap-y-1'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Wallet</h1>
      </div>
      <div className='w-full flex flex-col h-full'>
        <div className='bg-secondary h-[70%] flex justify-between items-center rounded-lg py-3'>
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
            <button className='p-3 w-full text-xl bg-green-500 rounded-lg' onClick={handleDepo}>
              <p>Deposit</p>
            </button>
          </div>
          <div className='py-2 text-tertiary text-center w-full'>
            <button className='p-3 w-full text-xl bg-blue-500 rounded-lg' onClick={handleTransfer}>
              <p>Transfer</p>
            </button>
          </div>
        </div>
      </div>

      <Modal
        opened={depoModal}
        onClose={() => setDepoModal(false)}
        title="Deposit"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div>
          <DepositForm />
        </div>
      </Modal>
    </div>
  )
}


const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    // Here, you'd usually send the deposit request to your backend
    console.log(`Depositing ${amount} to wallet`);

    // Reset the form and error state after deposit
    setAmount('');
    setError('');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Deposit Funds</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      
      <div className="mt-6">
        <button
          onClick={handleDeposit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Deposit
        </button>
      </div>
    </div>
  );
};



export default WalletBox;