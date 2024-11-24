# TechnicalTest

This repository contains a solution for the technical test consisting of a **Node.js/Express REST API** and a **ReactJS web application** to manage products.

## Architecture

The project uses a **monorepo** setup, with the following structure:


### API (Backend)
- **Node.js/Express** REST API.
- MongoDB for product data.
- **JWT authentication** for secure access.
- CRUD operations for managing products.
- **WebSocket** for real-time updates.
  
### App (Frontend)
- **ReactJS** for building the frontend.
- **Material UI** for the design.
- **Redux** for state management.
- Real-time updates via **WebSocket**.

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone <repo_url>
    cd TechnicalTest
    ```

2. Install dependencies for both the frontend and backend:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    ```bash
    cp api/.env.example api/.env
    cp app/.env.example app/.env
    ```

4. **Run the applications**:
    - API:
      ```bash
      cd api
      npm install
      npm run dev
      ```
    - React App:
      ```bash
      cd app
      npm install
      npm start
      ```

## Features

- **Product management** (CRUD) through the API.
- Real-time updates using **WebSocket**.
- **JWT authentication** for secure login.
- **Redux** for managing state in the frontend.

## Product Data (MongoDB)
The database is pre-seeded with sample products:
```json
[
  { "_id" : 1, "name" : "AC1 Phone1", "price" : 200.05, "available" : true },
  { "_id" : 2, "name" : "AC2 Phone2", "price" : 147.21, "available" : false },
  { "_id" : 3, "name" : "AC3 Phone3", "price" : 150, "available" : true },
  { "_id" : 4, "name" : "AC4 Phone4", "price" : 50.20, "available" : true }
]
```

## Versions Used

- **Node.js** v18.20.5
- **React** v18.3.1
- **MongoDB** v6.11.0
- **Material UI** v6.1.8
- **Redux** v5.0.1
- **Socket.io-client** v4.8.1
- **TypeScript** v4.9.5
- **Express** v4.21.1
- **Prettier** v3.3.3
- **Jest** v29.7.0

