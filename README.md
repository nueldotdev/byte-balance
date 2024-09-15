# Byte-Balance

Byte-Balance is a digital wallet system that allows users to manage their finances, send money, and track transactions with ease.

## Features

- User authentication (signup, login, token verification)
- Wallet management (check balance, send money)
- Transaction history
- User profile management

## API Service

The project includes an API service that interacts with the backend. Here are the main functionalities:

### Authentication

- Signup: Create a new user account
- Login: Authenticate existing users
- Verify Token: Confirm user credentials

### User Profile

- Get Username: Retrieve username by user ID

### Wallet Management

- Get Wallet Balance: Check current balance
- Send Money: Transfer funds to another user

### Transactions & Notifications

- Get All User Transactions: Retrieve transaction history

## Installation

To set up the Byte-Balance project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/byte-balance.git
   cd byte-balance
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Running the Project

To run the Byte-Balance project:

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to `http://localhost:3000` (or the port specified in your console output).
