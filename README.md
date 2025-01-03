# MINILEMON-TECHTEST

This project is a simple demonstration of a CRUD (Create, Read, Update, Delete) API built using Express.js, Prisma, and MySQL. It highlights basic operations for managing user data, including secure password hashing and validation.

## FEATURES

- **Create**: Register new users.
- **Read**: Fetch all users.
- **Update**: Update user details.
- **Delete**: Remove a user.

## TECH STACK

- **PROGRAMMING LANGUAGE** : Typescript
- **BACKEND** : Express.Js, Prisma
- **DATABASE** : MySQL
- **MISC** : nodemon, dotenv, bcrypt, express-validator

## INSTALATION

### Prerequisites

- Node.js (>=16.x)
- MySQL database
- npm or yarn

### Steps

1.  Clone the repository:
    ```
    git clone (gitHub Link)
    ```
2.  Navigate to the project directory :
    ```
    cd project-name
    ```
3.  Install dependencies :
    ```
    npm install
    ```
4.  Configure environment variables: Create a .env file in the root directory and add the following:
    ```
    in .env
    DATABASE_URL="mysql://username:password@localhost:3306/database_name"
    SECRET_KEY="your_secret_key"
    ```
5.  Run database migrations:
    ```
    npx prisma migrate dev
    ```
6.  Start the development server:

    ```
    npm run dev
    ```

## API ENDPOINTS

### CREATE (REGISTER)

- POST /register: Register a new user.

* Body :

  ```
  {
  "nama": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "nomorTelepon": "123456789",
  "statusAktif": true,
  "departement": "Engineering"
  }
  ```

* Response :

  ```
  {
  "message": "Register Success (Success Create User)"
  }

  ```

### READ (GET ALL USERS)

- GET /users: Fetch all users.

* Response :

  ```
  {
  "message": "Success fetching all users",
  "data": [
    {
      "nama": "John Doe",
      "email": "john@example.com",
      "nomorTelepon": "123456789",
      "statusAktif": true,
      "departement": "Engineering"
    },
    {},
    {},
    ...
  ]
  }

  ```
