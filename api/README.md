# API README

## Project Setup

This project is built using TypeScript and Express. It provides functionality for managing products and user authentication. The API includes routes for product CRUD operations, and authentication is handled via JWT.

### Requirements

- **Node.js** (v18.20.5 or higher)
- **npm** (v10.8.2 or higher)

### Installation

1. **Clone the repository** (if you haven't already):

    ```bash
    git clone <repo_url>
    cd api
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

    - Update the `.env` file with the appropriate configuration, such as the MongoDB connection URL.

4. **Seed the database**:

    To populate the database with sample data, including two users and products, run the following:

    ```bash
    npm run seed
    ```

    **Users created during seeding**:

    - **Chawki Ferroukhi**  
      Email: chawki.ferroukhi@example.com  
      Password: password123

    - **Zoe Simon**  
      Email: zoe.simon@example.com  
      Password: password123

    **Products seeded**:
    - AC1 Phone1
    - AC2 Phone2
    - AC3 Phone3
    - AC4 Phone4

### Running the Development Server

1. To run the development server locally:

    ```bash
    npm run dev
    ```

2. To build the project (for production):

    ```bash
    npm run build
    ```

    **Note**: There may be issues with the `dist` folder, so be sure to check the build logs.

### Tests

Tests were running perfectly until recently when a constructor error suddenly popped up. We are currently investigating this issue.

To run tests:

```bash
npm run test
```

### Available Routes

#### Authentication Routes

- **POST /login**: Authenticates a user and returns a JWT token.

#### Product Routes (requires authentication)

- **GET /products**: Fetches all products.
- **GET /products/:id**: Fetches a single product by ID.
- **POST /products**: Creates a new product.
- **PUT /products/:id**: Updates an existing product.
- **DELETE /products/:id**: Deletes a product by ID.

### Middleware

- **Authentication Middleware**: Protects routes that require a valid JWT token (applied globally to product routes).

### Folder Structure

- **`src/entities`**: Defines the database models (e.g., Product).
- **`src/config`**: Configuration files, including MongoDB connection setup.
- **`src/repositories`**: Data access layer for products and users.
- **`src/controllers`**: Contains business logic for handling requests.
- **`src/middlewares`**: Middleware for authentication and other checks.
- **`src/auth`**: Handles JWT authentication logic.
- **`src/routes`**: Defines the API routes for products and authentication.
- **`src/scripts`**: Contains scripts like data seeding.
- **`src/data`**: Contains the data for seeding (JSON files).
- **`src/factories`**: Factory classes for creating products.
- **`src/tests`**: Unit tests for the product controller.