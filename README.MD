# 🏡 Property Pulse

An AI-powered real estate investment and analysis platform that helps users evaluate properties, track market trends, and make smarter financial decisions.

## 🚀 Project Status

**Current Phase**: Active Development  
**Version**: 0.1.0 (Pre-release)  
**Last Updated**: August 2025

> This project is under active development. Core features are functional, with ongoing work on ML integration and UI enhancements.

## ✨ Features

### ✅ Implemented

- 📊 Modern responsive React frontend with TailwindCSS
- 🧠 Spring Boot REST API with PostgreSQL integration
- 🛡️ User authentication foundation (Spring Security)
- 🌓 Dark/light theme toggle

### 🚧 In Progress

- 🤖 Python ML service integration for property evaluation
- 📈 Interactive property analytics dashboard
- 📊 Advanced market analytics and financial metrics
- 🔒 Complete authentication and authorization system
- 📄 Admin interface structure

### 🎯 Planned

- 🧠 Machine learning models for investment scoring
- 📈 Real-time market data integration
- 🗃 Comprehensive property database
- 📱 Enhanced mobile experience

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

### Backend

- **Java 21** with Spring Boot 3
- **Spring Security** for authentication
- **Spring Data JPA** for database access
- **PostgreSQL** as primary database
- **Maven** for dependency management

### ML/AI (Planned)

- **Python 3.10+** for ML services
- **scikit-learn** for machine learning models
- **pandas** for data processing
- Integration with real estate APIs

## 📁 Project Structure

```
property-pulse/
├── client/                # React TypeScript frontend
│   ├── src/
│   │   ├── assets/        # Assets
│   │   ├── components/    # UI components (organized by feature)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Different pages in the application
│   │   ├── services/      # API integration
│   │   ├── styles/        # Custom CSS styles for entire application
│   │   └── types/         # TypeScript definitions
│   └── package.json
├── backend-java/          # Spring Boot REST API
│   ├── src/main/java/
│   │   ├── controller/    # REST endpoints
│   │   ├── service/       # Business logic
│   │   ├── repository/    # Data access layer
│   │   └── model/         # JPA entities
│   └── pom.xml
├── ml-services/           # Python ML services (in development)
├── database/              # Database scripts and migrations
└── docker-compose.yml     # Coming soon
```

## 🚀 Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Java 21+](https://adoptopenjdk.net/)
- [PostgreSQL 14+](https://www.postgresql.org/)
- [Python 3.10+](https://www.python.org/) (for future ML features)
- Maven (included via `./mvnw` wrapper)

### Quick Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/rpat9/property-pulse.git
   cd property-pulse
   ```

2. **Start the database**

   ```bash
   docker-compose up -d postgres
   ```

3. **Start the backend**

   ```bash
   cd backend-java
   ./mvnw spring-boot:run
   ```

4. **Start the frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

### Environment Configuration

You can run without PostgreSQL temporarily by disabling JPA in `application.properties`. See individual service READMEs for detailed configuration options.

## 📚 Documentation

- **[System Architecture](docs/ARCHITECTURE.md)** - Technical design and component overview
- **[API Documentation](docs/API.md)** - REST API endpoints and usage
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Setup and deployment instructions
- **[Frontend README](client/README.md)** - React app specific documentation
- **[Backend README](backend-java/README.md)** - Spring Boot API documentation

## 🧪 Testing

```bash
# Backend tests
cd backend-java && ./mvnw test

# Frontend tests (coming soon)
cd client && npm test

# ML service tests (planned)
cd ml-python && python -m pytest
```

## 🗺️ Development Roadmap

### Phase 1: Core Infrastructure ✅

- [x] Project structure and build system
- [x] React frontend with modern UI components
- [x] Spring Boot API foundation
- [x] Database integration
- [x] Basic authentication setup

### Phase 2: Feature Development 🚧

- [ ] Complete user authentication flow
- [ ] Property data models and API endpoints
- [ ] Property search and listing functionality
- [ ] Basic analytics dashboard
- [ ] Python ML service integration

### Phase 3: AI Integration 🎯

- [ ] Machine learning models for property valuation
- [ ] Market trend analysis
- [ ] Investment risk assessment
- [ ] Real-time data integration

### Phase 4: Production Ready 📈

- [ ] Comprehensive testing suite
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Deployment automation
- [ ] Documentation completion

## 🤝 Contributing

This project is in active development. Contributions, suggestions, and feedback are welcome!

### Current Focus Areas

- UI/UX improvements and responsive design
- Backend API development and testing
- ML model research and implementation
- Documentation and code organization

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- UI components styled with TailwindCSS
- Icons provided by Lucide React
- Inspired by leading real estate platforms

---

**Note**: This is an active development project. Features and documentation are being continuously updated. Check back for the latest progress and releases.

Made with ❤️ for the real estate and tech community.
