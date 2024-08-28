import React, { createContext, useState, useEffect } from "react";
import { apiService } from "../api/Api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const id = localStorage.getItem('user_id');

  const [userDet, setUserDet] = useState({
    full_name: "",
    username: "",
    email: "",
    userImg: "",
    user_id: id,
  });

  const [walletBal, setWalletBal] = useState(0);
  const [incoming, setIncoming] = useState(0);
  const [outgoing, setOutgoing] = useState(0)
  const [getPin, setGetPin] = useState(false);
  const [loading, setLoading] = useState(true);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDet({ ...user, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Changes saved:', user);
    // Implement save functionality here (e.g., API call)
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Implement logout functionality here
  };


  const fetchUserProfile = async (userId) => {
    try {
      // Fetch profile information
      const profileResponse = await apiService.getProfileInfo(userId);
      const profileData = profileResponse.data;
      console.log(profileData)

      const checkPin = await apiService.checkPin(userId);
      const pinData = checkPin.data;

      if (pinData.message === "Pin not set") {
        setGetPin(true)
      } else {
        setGetPin(false)
      }
      console.log(pinData)

      
      // Fetch user image
      const imageResponse = await apiService.getUserImg(userId);
      const imageData = imageResponse.data;
      console.log(imageData)
      
      // Fetch wallet balance
      const walletBal = await apiService.getWalletBalance(userId);
      const walletData = walletBal.data;
      console.log(walletData)

      // Fetch transactions
      const transactions = await apiService.getAllUserTransactions(userId);
      const transactionData = transactions.data;
      console.log(transactionData)

      // Update state with fetched data
      setUserDet((prevState) => ({
        ...prevState,
        full_name: profileData.fullname,
        username: profileData.username,
        email: profileData.email,
        userImg: imageData.profile_picture_url,
      }));

      setWalletBal(walletData.message)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      fetchUserProfile(userId);
    }

  }, []);

  useEffect(() => {
    console.log('Updated userDet state:', userDet);
  }, [userDet]);

  return (
    <UserContext.Provider value={{
      getPin, setGetPin, userDet, setUserDet, loading, setLoading, handleInputChange, handleSaveChanges, handleLogout, walletBal
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Wrap your app in UserProvider in index.js or App.js
