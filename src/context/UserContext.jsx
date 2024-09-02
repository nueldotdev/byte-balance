import React, { createContext, useState, useEffect } from "react";
import { apiService } from "../api/Api";

export const UserContext = createContext();


function getAmount(array) {
  var total = 0;

  array.forEach(element => {
    total = total + Number(element.amount)
  });

  return total
}


function groupTransactionsByMonth(transactions) {
  const monthlyData = {};

  transactions.forEach(transaction => {
    // Convert amount to a number and date to a Date object
    const amount = parseFloat(transaction.amount);
    const date = new Date(transaction.transaction_date);
    const month = date.toLocaleString('default', { month: 'short' });

    if (!monthlyData[month]) {
      monthlyData[month] = { month, Outgoing: 0, Incoming: 0 };
    }

    if (transaction.transaction_type === 'deposit') {
      // Add to Incoming
      monthlyData[month].Incoming += amount;
    } else if (transaction.transaction_type === 'transfer') {
      // Add to Outgoing
      monthlyData[month].Outgoing += amount;
    }
  });

  // Convert the object into an array of monthly data
  const result = Object.values(monthlyData);

  return result;
}


export const UserProvider = ({ children }) => {

  function currentDate(theDate) {
    const day = theDate.getDate();
    const month = theDate.toLocaleString('default', { month: 'short' });
    const year = theDate.getFullYear();
  
    const formattedDate = `${month} ${day}, ${year}`;
  
    return formattedDate;
  }
  

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
  const [outgoing, setOutgoing] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [getPin, setGetPin] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDet({ ...user, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Changes saved:', user);
    // Implement save functionality here (e.g., API call)
  };


  const fetchUserProfile = async (userId) => {
    try {
      setLoading(true)
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

      // Filter transactions by month
      const monthlyTransactions = groupTransactionsByMonth(transactionData.transactions);
      console.log("Monthly Sort: ", monthlyTransactions)
      // Filter transactions by deposit and transfer
      const depositTransactions = transactionData.transactions.filter(transaction => transaction.transaction_type === 'deposit');
      const transferTransactions = transactionData.transactions.filter(transaction => transaction.transaction_type === 'transfer');

      const totalIncoming = getAmount(depositTransactions);
      const totalOutgoing = getAmount(transferTransactions);

      // Update state with fetched data
      setUserDet((prevState) => ({
        ...prevState,
        full_name: profileData.fullname,
        username: profileData.username,
        email: profileData.email,
        userImg: imageData.profile_picture_url,
      }));

      setWalletBal(Number(walletData.message))

      setTransactions(transactionData.transactions)
      setMonthlyData(monthlyTransactions)
      setIncoming(totalIncoming)
      setOutgoing(totalOutgoing)

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAll = () => {
    const userId = localStorage.getItem('user_id');
    if (userId !== null) {
      fetchUserProfile(userId);
    }
  }

  useEffect(() => {
    getAll()
  }, []);

  useEffect(() => {
    console.log('Updated userDet state:', userDet);
  }, [userDet]);

  return (
    <UserContext.Provider value={{
      getPin, setGetPin,
      userDet, setUserDet,
      loading, setLoading,
      handleInputChange, handleSaveChanges,
      walletBal, incoming, outgoing,
      transactions, monthlyData,
      currentDate, getAll
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Wrap your app in UserProvider in index.js or App.js
