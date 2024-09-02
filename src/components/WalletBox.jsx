import { LoadingOverlay, Modal, PinInput  } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { BiSolidCoinStack } from "react-icons/bi";
import { HiMiniArrowDownCircle, HiMiniArrowUpCircle } from 'react-icons/hi2';
import { apiService } from '../api/Api';
import { notifications } from '@mantine/notifications';
import { UserContext } from "../context/UserContext";


const WalletBox = () => {
  const [depoModal, setDepoModal] = useState(false);
  const [action, setAction] = useState("deposit" || "transfer")

  const { userDet, walletBal, incoming, outgoing } = useContext(UserContext);

  var cash = [
    { label: "in", amount: incoming, icon: <HiMiniArrowDownCircle size={17} className="text-green-500" /> },
    { label: "balance", amount: walletBal, icon: <BiSolidCoinStack size={16} className="text-primary" /> },
    { label: "out", amount: outgoing, icon: <HiMiniArrowUpCircle size={17} className="text-blue-500" />  }
  ]

  const handleDepo = () => {
    setAction("deposit")
    setDepoModal(!depoModal)

  }
  const handleTransfer = () => {
    setAction("transfer")
    setDepoModal(!depoModal)
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
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div>
          {action === "deposit" ? <DepositForm /> : <TransferForm />}
        </div>
      </Modal>
    </div>
  )
}


const DepositForm = () => {

  const { userDet, loading } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  
  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    // Here, you'd usually send the deposit request to your backend
    console.log(`Depositing ${amount} to wallet`);
    const deposit = await apiService.depositMoney(amount, userDet.user_id);
    const depositData = deposit.data;
    handlePayStack(depositData.authorization_url)

    // Reset the form and error state after deposit
    setAmount(0);
    setError('');
  };


  const handlePayStack = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
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
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 7 }} loaderProps={{ color: 'orange', type: 'dots', size: 100 }} />
    </div>
  );
};
const TransferForm = () => {

  const { userDet, loading } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState('');


  const validateUser = async () => {
    try {
      const reciepient = await apiService.validateUser(receiver);
      const reciepientData = reciepient.data;
      setMessage(reciepientData.message)
      console.log(reciepientData)
    }
    catch (error) {
      console.error(error);
    }
    // finally {

    // }
  }

  const handleTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      const transfer = await apiService.sendMoney(userDet.user_id, receiver, amount, pin)
      const transferData = transfer.data;
      console.log(transferData)
      notifications.show({
        title: 'Transfer Successful',
        color: '#E34A32',
        message: 'You\'ve just spent money💸',
      })

    } catch (error){
      console.log(error)
      notifications.show({
        title: 'Transfer Unsuccessful',
        color: 'red',
        message: 'No way, your bad at this too!?🙄',
      })
    }
  }

  const checkUser = () => {
    validateUser()
  }


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-ld">
      <h1 className="text-2xl font-bold mb-4">Transfer Funds</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">To:</label>
        <div className="flex items-center justify-between mb-1">
          <input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter reciepient username"
          />
          <button className="bg-primary p-2 ml-2 rounded-lg text-white hover:bg-secondary" onClick={checkUser}>Search</button>
        </div>

        <div className="text-center font-600 my-2">
          {message}
        </div>
        
        <label className="block text-gray-700 font-semibold mb-1">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter amount"
        />
        <label className="block text-gray-700 font-semibold">Pin:</label>
        <PinInput
            size="xl"
            length={4}
            inputMode="numeric"
            onChange={setPin}
          />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      
      <div className="mt-2">
        <button
          onClick={handleTransfer}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Transfer
        </button>
      </div>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 7 }} loaderProps={{ color: 'orange', type: 'dots', size: 100 }} />
    </div>
  );
};



export default WalletBox;