import axios, { AxiosResponse } from 'axios';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://radar2.pythonanywhere.com/";

// API Endpoints
const endpoints = {
  signup: `${baseUrl}signup/`,
  login: `${baseUrl}login/`,
  verifyUserToken: `${baseUrl}verify-token/`,

  getUsername: `${baseUrl}get-username/`,
  getProfileInfo: `${baseUrl}get-username-email-fullname/`,
  getUserImg: `${baseUrl}get-user-profile-pic/`,

  getWalletBalance: `${baseUrl}get-wallet-balance/`,
  sendMoney: `${baseUrl}send-money/`,
  depositMoney: `${baseUrl}topup-wallet/`,

  checkPin: `${baseUrl}check-pin-availability/`,
  createPin: `${baseUrl}create-wallet-pin/`,
  changePin: `${baseUrl}change-wallet-pin/`,

  getAllUserTransactions: `${baseUrl}get-all-transactions/`,
  getUserNotifications: `${baseUrl}get-all-user-notifications/`,


  validateUser: `${baseUrl}check-user-existence-with-username/`,
  getUsernamePic: `${baseUrl}get-username-and-prof-pic/`,


  changeProfileInfo: `${baseUrl}change-username-email-fullname/`,
  changePassword: `${baseUrl}change-password-logged-in/`
};


const header = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
}



// API Service
export const apiService = {
  /**
   * Sends a POST request to the signup endpoint to create a new user.
   * 
   * @implements {string} user_type - The type of user (always "user").
   * @param {string} full_name - The full name of the user.
   * @param {string} username - The username chosen by the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password chosen by the user.
   * @return {Promise<AxiosResponse>} The response from the server.
   */
  signup: (
    full_name: string, username: string, email: string, password: string
  ): Promise<AxiosResponse> => axios.post(endpoints.signup, {
    user_type: "user", full_name, username, email, password
  }),


  /**
   * Sends a POST request to the login endpoint to authenticate a user.
   *
   * @param {string} username_or_email - The username of the user.
   * @param {string} password - The password of the user.
   * @return {Promise<AxiosResponse>} The response from the server.
   */
  login: (
    username_or_email: string, password: string
  ): Promise<AxiosResponse> => axios.post(endpoints.login, {
    username_or_email, password
  }),


  /**
   * Sends a POST request to the verify user endpoint to verify a user's credentials.
   *
   * @param {number} token - The authentication token.
   * @param {string} email - The email address of the user.
   * @param {string} full_name - The full name of the user.
   * @param {string} username - The username chosen by the user.
   * @param {string} password - The password chosen by the user.
   * @return {Promise<AxiosResponse>} The response from the server.
   */
  verifyUserToken: (
    token: number, email: string, full_name: string, username: string, password: string
  ) => axios.post(endpoints.verifyUserToken, {
    full_name, username, email, password, token
  }),


 /**
 * Retrieves the username associated with the provided user ID.
 *
 * @param {number} user_id - The ID of the user.
 * @return {Promise<AxiosResponse>} The response from the server.
 */
  getUsername: (
    user_id: number
  ): Promise<AxiosResponse> => axios.post(endpoints.getUsername, { user_id }, header),



  /**
   * Retrieves the current balance of the user's wallet.
   *
   * @param {number} user_id - The ID of the user.
   * @return {Promise<AxiosResponse>} The response from the server containing the wallet balance.
   */
  getWalletBalance: (
    user_id: number
  ) => axios.post(endpoints.getWalletBalance, { user_id }, header),


  checkPin: (user_id) => axios.post(endpoints.checkPin, {user_id}, header),


  /**
   * Creates a new PIN for the specified user's wallet.
   *
   * @param {number} user_id - The ID of the user.
   * @param {number} wallet_pin - The PIN to be created for the user's wallet.
   * @return {Promise<AxiosResponse>} The response from the server.
   */
  createPin: (
    user_id: number,
    wallet_pin: number
  ) => axios.post(endpoints.createPin, {
    user_id, wallet_pin
  }),
  
  
  changePin: (data: any) => axios.post(endpoints.changePin, data),



  /**
   * Initiates a money transfer from the sender's wallet to the receiver's wallet.
   *
   * @param {number} sender_id - The ID of the user sending the money.
   * @param {string} receiver_username - The username of the user receiving the money.
   * @param {number} amount - The amount of money to be transferred.
   * @param {number} wallet_pin - The sender's wallet PIN for verification.
   * @return {Promise<AxiosResponse>} The response from the server.
   */
  sendMoney: (
    sender_id: number,
    receiver_username: string,
    amount: number,
    wallet_pin: number) => axios.post(endpoints.sendMoney, {
      sender_id,
      receiver_username,
      amount,
      wallet_pin
    }, header),


/**
 * Sends a POST request to the `depositMoney` endpoint with the specified `amount` and `user_id`.
 *
 * @param {number} amount - The amount of money to be deposited.
 * @param {number} user_id - The ID of the user depositing the money.
 * @return {Promise<AxiosResponse<any>>} A Promise that resolves to the response from the server.
 */
  depositMoney: (
    amount: number,
    user_id: number
  ) => axios.post(endpoints.depositMoney, {
    amount, user_id
  }, header),

  

  /**
   * Retrieves all user transactions for a given user ID.
   *
   * @param {number} user_id - The ID of the user.
   * @return {Promise<AxiosResponse<any>>} A Promise that resolves to the response from the server.
   */
  getAllUserTransactions: (
    user_id: number
  ) => axios.post(endpoints.getAllUserTransactions, { user_id }, header),



  getUserNotifications: (
    user_id: number
  ) => axios.post(endpoints.getUserNotifications, { user_id }, header),


  changeProfileInfo: (user_id: number) => axios.post(endpoints.changeProfileInfo, { user_id }, header),

  changePassword: (data: string) => axios.post(endpoints.changePassword, { data }, header),

  getProfileInfo: (user_id: number) => axios.post(endpoints.getProfileInfo, { user_id }, header),
  
  getUserImg: (user_id: number) => axios.post(endpoints.getUserImg, { user_id }, header),


  /**
   * Validates a user based on the provided username.
   *
   * @param {string} username - The username to be validated.
   * @return {Promise<AxiosResponse>} The response from the server.
   */
  validateUser: (
    username: string
  ) => axios.post(endpoints.validateUser, { username }, header)
};


