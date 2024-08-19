import React, { useState, useEffect } from 'react';
import './Logo.css';


const Abbrev = () => {
  return (
    <>
      <span className="abbreviated">B</span>
      <div className="slash"></div>
      <span className="abbreviated">B</span>
      <span className="period">.</span>
    </>
  )
}

const FullName = () => {
  return (
    <>
      <span className="text">ByteBalance</span>
      
    </>
  )
}

const Logo = (props) => {

  return (
    <div className="logo-container">
      <div className={`${props.className} logo-text`}>
        <Abbrev />
      </div>
    </div>
  );
};

export default Logo;
