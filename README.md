
# API Service for Wallet System

This module provides a set of functions to interact with a wallet system API. It uses `axios` for making HTTP requests to the backend. The API endpoints include functionalities for user authentication, wallet management, and user transactions.

## Installation

To use this API service, you need to have `axios` installed in your project. If you don't have it installed yet, you can add it via npm:

```bash
npm install axios
```

## API Endpoints

Each function below is documented using JSDoc to help you understand how to use it and what fields are required.

### Authentication

#### Signup

```javascript
/**
 * Sends a POST request to the signup endpoint to create a new user.
 * @param {string} full_name - The full name of the user.
 * @param {string} username - The username chosen by the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password chosen by the user.
 * @return {Promise<AxiosResponse>} The response from the server.
 */
apiService.signup(full_name, username, email, password)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Fields:**
- `user_type` (string): Type of the user, usually "user".
- `full_name` (string): The full name of the user.
- `username` (string): The desired username.
- `email` (string): The email address of the user.
- `password` (string): The password for the account.

<br>

#### Login

```javascript
/**
 * Sends a POST request to the login endpoint to authenticate a user.
 * 
 * @param {string} username_or_email - The username or email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<AxiosResponse>} The response from the server.
 */
apiService.login(username, password)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Fields:**
- `username_or_email` (string): The username or email of the user.
- `password` (string): The password for the account.

**$NOTE:$** the field `username_or_email` ONLY accepts `username` and doesn't support `email` 

<br>

#### Verify Token

```javascript

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
apiService.verifyUserToken(full_name, username, email, password, token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Fields:**
- `full_name` (string): The username or email of the user.
- `password` (string): The password for the account.
- `token` (number) - The authentication token from verification email.
- `email` (string)  - The email address of the user.

<br>

### User Profile

#### Get Username

```javascript
/**
 * Retrieves the username associated with the provided user ID.
 * 
 * @param {number} user_id - The ID of the user.
 * @return {Promise<AxiosResponse>} The response from the server.
 */
apiService.getUsername(user_id)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Fields:**
- `user_id` (number): The ID of the user.

### Wallet Management

#### Get Wallet Balance

```javascript
/**
 * Retrieves the current balance of the user's wallet.
 * 
 * @param {number} user_id - The ID of the user.
 * @return {Promise<AxiosResponse>} The response from the server containing the wallet balance.
 */
apiService.getWalletBalance(user_id)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Fields:**
- `user_id` (number): The ID of the user.

#### Send Money

```javascript
/**
 * Initiates a money transfer from the sender's wallet to the receiver's wallet.
 * 
 * @param {number} sender_id - The ID of the user sending the money.
 * @param {string} receiver_username - The username of the user receiving the money.
 * @param {number} amount - The amount of money to be transferred.
 * @param {number} wallet_pin - The sender's wallet PIN for verification.
 * @return {Promise<AxiosResponse>} The response from the server.
 */
apiService.sendMoney(user_id, receiver_username, amount, wallet_pin)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Fields:**
- `sender_id` (number): The ID of the user sending the money.
- `receiver_username` (string): The username of the recipient.
- `amount` (number): The amount to be transferred.
- `wallet_pin` (number): The sender's wallet PIN for verification.

### Transactions & Notifications

#### Get All User Transactions

```javascript
/**
 * Retrieves all user transactions for a given user ID.
 * 
 * @param {number} user_id - The ID of the user.
 * @return {Promise<AxiosResponse<any>>} A Promise that resolves to the response from the server.
 */
apiService.getAllUserTransactions(user_id)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Fields:**
- `user_id` (number): The ID of the user.

## Usage

To use the API service, simply import the `apiService` and call the relevant function. The examples above illustrate how to use each function with appropriate fields.

## Configuration

All requests are configured to use `application/x-www-form-urlencoded` as the content type. The base URL is set to `https://radar2.pythonanywhere.com/`. You can change these settings if needed.

## Error Handling

Each function returns a promise that resolves to the `AxiosResponse` object. In case of an error, the promise will be rejected, and you can handle the error using `.catch()`.