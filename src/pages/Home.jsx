import { LoadingOverlay, Modal, PinInput } from '@mantine/core';
import React, { useContext, useState } from "react";
import { pieData, stats } from "../assets/chartData";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import TransactionList from "../components/TransactionList";
import WalletBox from "../components/WalletBox";
import { UserContext } from "../context/UserContext";
import { apiService } from '../api/Api';


const Home = () => {

  const { loading, getPin, setGetPin, userDet } = useContext(UserContext);
  const [pin, setPin] = useState(0)
  const [message, setMessage] = useState("")


  const createPin = async () => {
    try {
      const pinReq = await apiService.createPin(userDet.user_id, pin);
      const pinData = pinReq.data;
      setMessage(pinData.message)
      console.log(pinData)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="w-full h-full py-4 px-6 flex flex-col">
      <Header title="Home" />
      <div className="w-full h-full flex gap-5">
        <div className="w-full flex flex-col h-[100%]">
          <div className="h-3/6 p-2 rounded-lg">
            <WalletBox />
          </div>
          <div className="h-3/6 p-2 rounded-lg bg-tertiary_acc">
            <Statistics title="Sources" data={pieData} key1="Deposit" key2="Transfer" />
          </div>
        </div>
        <div className="w-full flex flex-col h-[100%]">
          <div className="h-3/6 p-2 rounded-lg bg-tertiary_acc">
            <Statistics title="Statistics" data={stats} key1="Incoming" key2="Outgoing" />
          </div>
          <div className="h-3/6">
            <TransactionList />
          </div>
        </div>
      </div>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 7 }} loaderProps={{ color: 'orange', type: 'dots', size: 100 }} />

      <Modal
        opened={getPin}
        onClose={() => setGetPin(false)}
        title="Create Wallet Pin"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <div className="flex flex-col items-center justify-start gap-6">
          <p>Enter the 4-Digit pin for your wallet</p>
          <PinInput
            size="md"
            length={4}
            inputMode="numeric"
            onChange={setPin}
          />
          <button
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all"
            onClick={() => {
              console.log("Pin: ", pin);
              createPin()
            }}
          >
            Create Pin
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
