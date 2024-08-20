import React, { useState, useEffect } from 'react'
import Logo from '../components/Logo/Logo'
import { Button } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { landingTexts } from '../assets/text'

const Index = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to control fade in/out

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % landingTexts.length);
        setFade(true);
      }, 1000);

    }, 5000);

    return () => clearInterval(intervalId);
  }, [landingTexts.length]);

  return (
    <div className='full-screen-fixed bg-primary_acc'>
      <div className='w-full flex justify-between items-center px-6 py-4'>
        <Logo className='text-secondary' />
        <div className='flex justify-between items-center gap-x-2'>
          <NavLink to='/entry?action=signin'>
            <button className='text-primary py-2 px-3 bg-transparent border-primary transition-main hover-scale'>
              <p>Sign In</p>
            </button>
          </NavLink>
          <NavLink to='/entry?action=signup'>
            <button className='text-tertiary py-2 px-3 bg-primary transition-main hover-scale'>
              <p>Sign Up</p>
            </button>
          </NavLink>
        </div>
      </div>
      <div className='w-full h-full flex justify-center items-center flex-col gap-y-3'>
        <h1 className='mb-3 font-[800] 2xl:text-9xl xl:text-7xl lg:text-6xl sm:text-6xl text-4xl text-secondary anim-main'>ByteBalance<span className="period">.</span></h1>
        <h3 className={`w-7/12 mb-3 font-[400] text-2xl sm:text-4xl text-secondary anim-main fade ${fade ? 'in' : 'out'}`}>{landingTexts[currentIndex]}</h3>
        <NavLink to='/entry?action=signup'>
          <button className='text-primary py-2 px-3 bg-transparent border-primary transition-main hover-scale mt-2'>Get Started</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Index