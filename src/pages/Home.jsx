import { LoadingOverlay, Modal, PinInput } from '@mantine/core';
import React, { useContext, useState, useEffect } from "react";
import { pieData, stats } from "../assets/chartData";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import TransactionList from "../components/TransactionList";
import WalletBox from "../components/WalletBox";
import { UserContext } from "../context/UserContext";
import {isauthenticated} from "../../Services";
import { apiService } from '../api/Api';
import { notifications } from '@mantine/notifications';


const Home = () => {


  const { loading, getPin, setGetPin, userDet, monthlyData } = useContext(UserContext);
  const [pin, setPin] = useState(0)
  const [message, setMessage] = useState("")


  useEffect(() => {
    if (isauthenticated()) {
    } else {
      window.location.href = "/entry?action=signin"
    }
  }, [])


  const createPin = async () => {
    try {
      const pinReq = await apiService.createPin(userDet.user_id, pin);
      const pinData = pinReq.data;
      setMessage(pinData.message)
      notifications.show({
        title: 'Pin Created',
        message: 'Your pin has been created successfully',
      })
    } catch (error) {
      console.error(error)
      notifications.show({
        title: 'Pin Creation Failed',
        message: 'Your pin has failed successfully',
      })
    }
  }


  return (
    <div className="w-full h-full py-4 px-4 md:px-6 flex flex-col">
      <Header title="Home" />
      <div className="w-full h-full flex flex-col lg:flex-row gap-5 md:mb-6 ">
        {/* First Column */}
        <div className="w-full lg:w-1/2 md:space-2 flex flex-col h-full">
          <div className="h-64 md:h-1/2 p-2 rounded-lg">
            <WalletBox />
          </div>
          <div className="h-64 md:h-1/2 p-2 rounded-lg bg-tertiary_acc">
            <Statistics title="Sources" data={pieData} key1="Deposit" key2="Transfer" />
          </div>
        </div>
  
        {/* Second Column */}
        <div className="w-full lg:w-1/2 flex md:space-2 flex-col h-full">
          <div className="h-64 md:h-1/2 p-2 rounded-lg bg-tertiary_acc">
            <Statistics title="Statistics" data={monthlyData} key1="Incoming" key2="Outgoing" />
          </div>
          <div className="h-64 md:h-1/2 md:mt-3">
            <TransactionList />
          </div>
        </div>
      </div>
  
      {/* Loading Overlay */}
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 7 }}
        loaderProps={{ color: 'orange', type: 'dots', size: 50 }} // Adjust size for better mobile view
      />
  
      {/* Modal */}
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
          <p className="text-center">Enter the 4-Digit pin for your wallet</p>
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
              createPin();
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
