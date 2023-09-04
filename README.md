# Authentication API Documentation

Welcome to the Authentication API documentation. This API provides endpoints for authentication-related operations, including password recovery, user registration, login, and user information updates.

## Base URL

The base URL for all API endpoints is `http://localhost:3050/auth/`.

## Endpoints

### 1. Forget Password

Initiate a password recovery process by providing your email and date of birth.

**Endpoint**: `POST /forget`

**Request:**

```json
POST /forget

Body:
{
    "email": "pardeep@gmail.com",
    "dateOfBirth": "14012001",
    "newPassword": "fossil"
}
```

**Endpoint**: `POST /signup`

**Request:**

```json
POST /signup

Body:
{
    "email": "pardeep@gmail.com",
    "username": "pardeep12",
    "password": "newpass",
    "dateOfBirth": "14012001"
}
```

**Endpoint**: `POST /login`

**Request:**

```json
POST /login

Body:
{
    "email": "pardeep@gmail.com",
    "password": "newpass"
}
```

**Endpoint**: `PUT /update`

**Request:**

```json
PUT /update

Body:
{
    "userId": "64e7082c84bbc440d761d7b9",
    "username": "akm123"
}
```

**Endpoint**: `DELETE /delete`

**Request:**

```json
DELETE /delete

Body:
{
    "email":"akm@gmail.com",
    "password":"akm12345"
}
```
