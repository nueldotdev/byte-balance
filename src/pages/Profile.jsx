import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Avatar } from '@mantine/core';


const Profile = () => {
  const { userDet, loading, handleInputChange, handleSaveChanges, handleLogout } = useContext(UserContext);

  const [user, setUser] = useState({
    username: 'broke.billions',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et metus nec metus bibendum feugiat.',
    phone: '555-555-5555',
    address: '123 Main St, Springfield, IL',
  });


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
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
        <div className="flex justify-between items-center">
          <label className="text-gray-600">Username:</label>
          <input
            className="border border-gray-300 p-2 rounded-md w-3/4"
            type="text"
            name="username"
            value={userDet.username}
            onChange={handleInputChange}
            placeholder="Your Username"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-600">Name:</label>
          <input
            className="border border-gray-300 p-2 rounded-md w-3/4"
            type="text"
            name="name"
            value={userDet.full_name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-600">Email:</label>
          <input
            className="border border-gray-300 p-2 rounded-md w-3/4"
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
  );
};

export default Profile;
