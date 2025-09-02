# API Documentation

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Success Response:**

```json
{
  "token": "string",
  "message": "User successfully registered"
}
```

**Error Response:**

```json
{
  "token": null,
  "message": "Email already registered"
}
```

### Login User

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response:**

```json
{
  "token": "string",
  "message": "Login successful"
}
```

## User APIs

### Get User Profile

```http
GET /api/user/profile
```

**Authentication Required:** Bearer Token

**Success Response:**

```json
{
  "id": "uuid",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "role": "string"
}
```

## Data Transfer Objects (DTOs)

### AuthResponse

Used for authentication responses:

```java
public class AuthResponse {
    private String token;
    private String message;
}
```

### RegisterRequest

Used for user registration:

```java
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
}
```

### LoginRequest

Used for user login:

```java
public class LoginRequest {
    private String email;
    private String password;
}
```

### UserProfile

Used for user profile responses:

```java
public class UserProfile {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
}
```

## Error Handling

All endpoints follow this error response format:

```json
{
  "message": "Error description",
  "timestamp": "2025-08-13T19:16:19Z",
  "status": 400,
  "path": "/api/endpoint"
}
```

Common HTTP Status Codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Utility APIs

### KeepAlive - Ping Database

```http
GET /api/keepalive
```
Description: This endpoint is used to check the health of the database connection. It executes a simple query (SELECT 1) to verify if the database is reachable.

**Success Response:**

```json
{
  "message": "Database pinged successfully at: 2025-08-01T12:00:00"
}
```

**Error Response:**

```json
{
  "message": "Database ping failed: [Error details]"
}
```