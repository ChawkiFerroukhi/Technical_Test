# Client README

## Project Setup

This project is a React-based client that interacts with the backend API to manage products and authentication. It uses **Redux** for state management, **Material UI** for UI components, and **Socket.io** for real-time communication.

### Requirements

- **React** (v18.3.1 or higher)
- **npm** (v10.8.2 or higher)

### Installation

1. **Clone the repository** (if you haven't already):

    ```bash
    git clone <repo_url>
    cd app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Setup environment variables**:

    Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

    - Update the `.env` file with the appropriate backend API URL.

4. **Credentials for Login**:

    To access the app, you will need to log in with one of the following credentials:

    - **Chawki Ferroukhi**  
      Email: chawki.ferroukhi@example.com  
      Password: password123

    - **Zoe Simon**  
      Email: zoe.simon@example.com  
      Password: password123

### Running the Development Server

1. To start the development server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to access the app.

### Routes

- **/login**: The login page where users authenticate with their credentials.
- **/products**: Displays the list of products (requires the user to be logged in). 

The `/products` route is protected and will not be accessible unless the user is logged in with a valid JWT token.

### Folder Structure

- **`src/pages`**: Contains the main pages, including login and product listing.
- **`src/redux`**: Contains Redux slices and stores for managing global state.
- **`src/api`**: Contains API utility functions to interact with the backend.
- **`src/entities`**: Defines the entities (e.g., Product).
- **`src/hooks`**: Custom hooks used throughout the app.
- **`src/layout`**: Contains layout components that structure the app (e.g., header, footer).
- **`src/components`**: Reusable UI components used in various parts of the app.

### Scripts

- **`npm start`**: Starts the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm run eject`**: Ejects the app configuration (not recommended unless necessary).

### Dependencies

- **React** (v18.3.1)
- **Material UI** (v6.1.8)
- **Redux** (v5.0.1)
- **React Router** (v7.0.1)
- **Axios** (v1.7.7)
- **Socket.io-client** (v4.8.1)

### Notes

- The `/products` route requires a logged-in user with a valid JWT token. Make sure to log in using one of the provided credentials.
- The app uses **Socket.io** for real-time updates on product changes.
- The app uses **Redux** for global state management, such as managing product data.