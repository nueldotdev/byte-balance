import React from "react";
import Header from "../components/Header";
import WalletBox from "../components/WalletBox";

const Home = () => {
  return (
    <div className="w-full h-full py-4 px-6 flex flex-col">
      <Header title="Home" />
      {/* Grid of two columns and two rows */}
      {/* <div className=' grid grid-cols-2 grid-rows-2 gap-4'>
        
        <div className='w-full h-full row-span-1 col-span-1 bg-gray-400 rounded-lg'>

        </div>
        <div className='w-full h-full row-span-1 col-span-1 bg-gray-400 rounded-lg'>

        </div>
        <div className='w-full h-full row-span-1 col-span-1 bg-gray-400 rounded-lg'>

        </div>
        <div className='w-full h-full row-span-1 col-span-1 bg-gray-400 rounded-lg'>

        </div>
      </div> */}
      <div className="w-full h-full grid grid-cols-2 gap-4">
        <div className="">
          <WalletBox />
        </div>
        <div className="h-[110%] relative">
          Box 2 (Slightly Longer)
        </div>
        <div className="">Box 3</div>
        <div className=" mt-7">Box 4</div>
      </div>
    </div>
  );
};

export default Home;
