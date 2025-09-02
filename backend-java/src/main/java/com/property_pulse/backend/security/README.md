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

#### Authentication

- Custom UserDetailsService implementation using email-based lookup
- DaoAuthenticationProvider with BCrypt password encoding
- Stateless session management

#### CORS Configuration

```java
configuration.setAllowedOrigins(List.of("http://localhost:5173"));
configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
configuration.setAllowedHeaders(List.of(
    "Authorization", 
    "Cache-Control", 
    "Content-Type",
    "Accept", 
    "X-Requested-With", 
    "Access-Control-Allow-Origin", 
    "Access-Control-Allow-Headers",
    "Origin"
));
```

#### Public Endpoints

The following endpoints are publicly accessible:

- `/` - Root path
- `/index.html` - Main page
- `/health` - Health check
- `/favicon.ico` - Favicon
- Static resources:
  - `/css/**`
  - `/js/**`
  - `/images/**`
  - `/static/**`
  - `/assets/**`
- Authentication endpoints:
  - `/api/auth/login`
  - `/api/auth/register`
- Utility endpoints:
  - `/api/keepalive`

All other endpoints require authentication.

## Authentication Flow

1. **Registration**

   ```
   POST /api/auth/register
   ```

   - Validates user input
   - Encrypts password using BCrypt
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

- Configured for development with localhost:5173
- Customizable allowed origins, methods, and headers
- Supports credentials
- 1-hour max age for preflight requests

### Session Management

- Stateless session policy
- No session cookies used
- Authentication state maintained via JWT tokens

## Adding Protected Routes

To add a new protected route:

```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/public/**").permitAll()
    .requestMatchers("/api/your-protected-route/**").authenticated()
    .anyRequest().authenticated())
```
