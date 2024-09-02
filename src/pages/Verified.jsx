import React, { useState, useEffect } from 'react'
import Logo from '../components/Logo/Logo'
import { NavLink } from 'react-router-dom'
import { isauthenticated } from "../../Services";


const Verified = () => {

  useEffect(() => {
    if (isauthenticated()) {
      window.location.href = "/dashboard/home"
    }
  }, [])  

  return (
    <div className='full-screen-fixed bg-primary_acc'>
      <div className='w-full flex justify-between items-center px-6 py-4'>
        <Logo className='text-secondary' />
      </div>
      <div className='w-full h-full flex justify-center items-center flex-col gap-y-3'>
        <h1 className='mb-3 font-[800] 2xl:text-9xl xl:text-7xl lg:text-6xl sm:text-6xl text-4xl text-secondary anim-main'>ByteBalance<span className="period">.</span></h1>
        <h3 className={`w-7/12 mb-3 font-[400] text-2xl sm:text-4xl text-secondary`}>Your email has been verified, please click the button below to sign in.</h3>
        <NavLink to='/entry?action=signin'>
          <button className='text-primary py-2 px-3 bg-transparent border-primary transition-main hover-scale mt-2'>Get Started</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Verified