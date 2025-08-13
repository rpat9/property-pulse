# Security Implementation

This document details the security implementation for the Property Pulse backend application.

## Overview

The security implementation uses Spring Security with JWT (JSON Web Tokens) for stateless authentication.

## Components

### JwtAuthenticationFilter

- Intercepts all incoming requests
- Validates JWT tokens
- Sets up SecurityContext for authenticated requests

### JwtService

Handles JWT-related operations:

- Token generation
- Token validation
- User details extraction

### SecurityConfig

Contains security-related configurations:

- CORS settings
- Authentication provider setup
- Request authorization rules
- Password encoding

## Authentication Flow

1. **Registration**

   ```
   POST /api/auth/register
   ```

   - Validates user input
   - Encrypts password
   - Creates new user
   - Returns JWT token

2. **Login**

   ```
   POST /api/auth/login
   ```

   - Validates credentials
   - Returns JWT token

3. **Protected Endpoints**
   - Require valid JWT token in Authorization header
   - Format: `Bearer <token>`

## Security Measures

### Password Storage

- Uses BCrypt password hashing
- Configurable work factor

### CORS Configuration

```java
configuration.setAllowedOrigins(List.of("http://localhost:5173"));
configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
```

### JWT Configuration

- Configurable expiration time
- Secure secret key storage
- Token refresh mechanism

## Adding Protected Routes

To add a new protected route:

```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/public/**").permitAll()
    .requestMatchers("/api/your-protected-route/**").authenticated()
    .anyRequest().authenticated())
```
