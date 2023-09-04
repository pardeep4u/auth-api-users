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


# HTTP Error Codes

HTTP error codes and their meanings:

## 400 Bad Request
- The request sent to the server is malformed or invalid. Check your request syntax and parameters.

## 401 Unauthorized
- The request requires authentication, and the provided credentials are either missing or invalid. Ensure you have the correct authentication tokens or credentials.

## 403 Forbidden
- The server has understood the request, but it refuses to fulfill it. This typically indicates that the user does not have permission to access the requested resource.

## 404 Not Found
- The requested resource could not be found on the server. Check the URL or resource path for errors.

## 500 Internal Server Error
- An unexpected error occurred on the server while processing the request. This is typically a server-side issue, and you should report it to the service provider.

## 503 Service Unavailable
- The server is temporarily unable to handle the request due to overload or maintenance. Retry the request later.

