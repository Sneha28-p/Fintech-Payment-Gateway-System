# Fintech Payment Gateway System

## Overview

A secure fintech backend application that simulates real-world payment processing. The system supports user authentication, wallet management, payment transactions, refunds, retry mechanisms, and basic fraud detection.

## Features

* User Signup and Login using JWT Authentication
* Secure Wallet Management
* Add Money to Wallet
* Payment Processing
* Transaction History
* Refund Processing
* Retry Failed Transactions
* Idempotent APIs to prevent duplicate payments
* Basic Fraud Detection using transaction rate limiting

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT, bcrypt
* **API Testing:** Hoppscotch / Postman

## Project Structure

```text
backend/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── server.js
└── .env
```

## API Endpoints

### Authentication

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | User login          |

### Wallet

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | /api/wallet     | Get wallet details  |
| POST   | /api/wallet/add | Add money to wallet |

### Payments

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| POST   | /api/payment/pay          | Process payment          |
| POST   | /api/payment/refund       | Refund transaction       |
| POST   | /api/payment/retry        | Retry failed payment     |
| GET    | /api/payment/transactions | View transaction history |

## Installation

1. Clone the repository

```bash
git clone https://github.com/Sneha28-p/Fintech-Payment-Gateway-System.git
```

2. Navigate to the project folder

```bash
cd Fintech-Payment-Gateway-System
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file inside the `backend` folder

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

5. Start the server

```bash
nodemon backend/server.js
```

## Future Enhancements

* Redis Integration
* Advanced Fraud Detection
* Docker Deployment
* Payment Gateway Integration
* Admin Dashboard

## Author

**Sneha Patted**
