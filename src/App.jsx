import { useState } from 'react'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Index from './pages/Index/Index';

import './App.css'
import '@mantine/core/styles.css';
import Home from './pages/Home/Home';
import Entry from './pages/Entry/Entry';


function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='home' element={<Home />} />
          <Route path='entry' element={<Entry />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
