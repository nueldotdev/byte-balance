import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Avatar } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import {isauthenticated} from "../../Services";

const Profile = () => {
  const { userDet, handleInputChange, handleSaveChanges } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isauthenticated()) {
    } else {
      window.location.href = "/entry?action=signin"
    }
  }, [])

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.clear();
    navigate('/entry?action=signin');
    // Implement logout functionality here
  };


  return (
    <div className="flex justify-center items-center h-full w-full">
       <div className="w-[80%] p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <Avatar
          size={"xl"}
          radius="100%"
          src={userDet.userImg}
        />
        <h2 className="text-2xl font-semibold mb-2">@{userDet.username}</h2>
        <p className="text-gray-600 mb-4">{userDet.email}</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
          <label className="text-gray-600">Username:</label>
          <input
            className="border border-gray-300 p-2 rounded-md w-3/4 max-sm:w-full"
            type="text"
            name="username"
            value={userDet.username}
            onChange={handleInputChange}
            placeholder="Your Username"
          />
        </div>
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
          <label className="text-gray-600">Name:</label>
          <input
            className="border border-gray-300 p-2 rounded-md w-3/4 max-sm:w-full"
            type="text"
            name="name"
            value={userDet.full_name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
        </div>
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
          <label className="text-gray-600">Email:</label>
          <input
            className="border border-gray-300 p-2 rounded-md w-3/4 max-sm:w-full"
            type="text"
            name="email"
            value={userDet.email}
            onChange={handleInputChange}
            placeholder="Your Email"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-secondary transition-all"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        <button
          className="bg-secondary2 text-white px-4 py-2 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
