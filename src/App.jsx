import { useState } from 'react'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Index from "./pages/Index";

import './App.css'
import '@mantine/core/styles.css';
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Profile from './pages/Profile';
import Verified from './pages/Verified';
import Transactions from './pages/Transactions';

const Layout = () => {
  return (
    <div className="full-screen flex fixed">
      <div className="w-[20%] h-full">
        <SideBar />
      </div>
      <div className="w-full h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};


function App() {
  return (
    <MantineProvider>
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
