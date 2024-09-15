import { useState } from 'react'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Index from "./pages/Index";

import './App.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Profile from './pages/Profile';
import Verified from './pages/Verified';
import Transactions from './pages/Transactions';
import { FaBarsStaggered } from "react-icons/fa6"; 

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="full-screen flex flex-col md:flex-row fixed">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-[60%]" : "w-0"
        } md:w-[25%] h-full fixed md:relative transition-width duration-300 overflow-hidden bg-gray-800 z-50`}
      >
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-col h-full overflow-auto">
        {/* Toggle Button for Small Screens */}
        <div className="z-[6000] flex justify-end md:hidden px-4 pt-4">
          <FaBarsStaggered
            className="h-8 w-8 text-gray-800 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        <Outlet />
      </div>
    </div>
  );
};


function App() {
  return (
    <MantineProvider>
      <Notifications />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="dashboard" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
          <Route path="entry" element={<Entry />} />
          <Route path="verified-email" element={<Verified />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App
