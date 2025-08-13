# Property Pulse Backend

A Spring Boot application that serves as the backend for Property Pulse, a real estate investment analysis platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Security](#security)
- [Contributing](#contributing)

## 🎯 Overview

Property Pulse Backend is a RESTful API service that powers the Property Pulse platform. It handles user authentication, property management, and investment analysis features.

## 💻 Tech Stack

- **Framework:** Spring Boot
- **Language:** Java 21
- **Database:** PostgreSQL (Supabase)
- **Security:** JWT Authentication
- **Build Tool:** Maven
- **API Documentation:** SpringDoc OpenAPI (Swagger)

## 📁 Project Structure

```
backend-java/
├── src/
│   └── main/
│       ├── java/com/property_pulse/backend/
│       │   ├── config/           # Configuration classes
│       │   ├── controller/       # REST API controllers
│       │   ├── dto/              # Data Transfer Objects
│       │   ├── model/            # Entity models
│       │   ├── repository/       # Data access layer
│       │   ├── security/         # Security configurations
│       │   └── service/          # Business logic
│       └── resources/
│           └── application.properties
└── pom.xml
```

## 🚀 Getting Started

### Prerequisites

- JDK 21 or higher
- Maven 3.8+
- PostgreSQL database (or Supabase account)

### Environment Variables

Create a `.env` file in the project root with the following variables:

```properties
SUPABASE_DB_URL=your_database_url
SUPABASE_DB_USERNAME=your_database_username
SUPABASE_DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600
```

### Building and Running

1. Clone the repository

```bash
git clone https://github.com/rpat9/property-pulse.git
cd property-pulse/backend-java
```

2. Install dependencies

```bash
mvn clean install
```

3. Run the application

```bash
mvn spring-boot:run
```

The server will start at `http://localhost:8080`

## 📚 API Documentation

Once the application is running, you can access the API documentation at:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

### Current API Endpoints

- Authentication
  - POST `/api/auth/register` - User registration
  - POST `/api/auth/login` - User login

## 🗄️ Database

The application uses PostgreSQL with Supabase as the database provider. The schema includes tables for:

- Users
- Property Listings
- AI Predictions
- User Inquiries
- User Favorites
- Property Images

Database migrations and schema details can be found in [database/README.md](database/README.md).

## 🔒 Security

The application implements the following security measures:

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration for frontend integration
- Role-based access control (User/Admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
