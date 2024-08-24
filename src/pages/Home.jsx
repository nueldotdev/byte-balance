import React from "react";
import Header from "../components/Header";
import WalletBox from "../components/WalletBox";
import Statistics from "../components/Statistics";
import Sources from "../components/Sources";
import { pieData, stats } from "../assets/chartData";
import TransactionList from "../components/TransactionList";

const Home = () => {
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
    </div>
  );
};

export default Home;
