├── backend/                    # Backend folder
│   ├── config/                  # Configuration files
│   │   └── db.js                # Database connection setup (MongoDB)
│   ├── controllers/             # API route handlers
│   │   └── authController.js    # Controller for authentication (register/login)
│   ├── models/                  # Mongoose models
│   │   └── User.js              # User model
│   ├── routes/                  # Route definitions
│   │   └── auth.js              # Routes for authentication (register/login)
│   ├── .env                     # Environment variables (MongoDB URI, JWT secret)
│   ├── server.js                # Main server file (Express setup)
│   └── package.json 

Backend shortv description :::
Located in the backend/ directory.

Handles the API requests for user registration, login, and authentication.

Key files:

server.js: Main file for setting up Express server and database connection.
auth.js: Route handling user registration and login.
user.js: Mongoose model for the user.
.env: Environment file for storing sensitive data like MongoDB URI and JWT secret.

backend work flow :

API Routes: Express handles registration and login routes (/register, /login).
Database: Mongoose interacts with MongoDB to store and retrieve user data.
Validation: Passwords are hashed with bcrypt, and JWT tokens are generated for authentication.
Error Handling: Custom error messages are sent for failed operations (e.g., registration or login errors).
Authentication: JWT middleware ensures protected routes require a valid token
