# 🏡 Property Pulse

An AI-powered real estate investment and analysis platform that helps users evaluate properties, track market trends, and make smarter financial decisions.

## 📁 Repository Structure

```
property-pulse/
├── client/                # Frontend (React)
├── backend-java/          # Java Spring Boot backend (REST API)
├── ml-python/             # Python services for AI/ML models
├── db/                    # SQL scripts or database config (PostgreSQL)
├── README.md              # Project overview
└── .gitignore             # Global ignore rules
```

## ✨ Features

- 📊 AI-driven property evaluation and investment scoring
- 🧠 Machine Learning models (Python)
- 🗂 REST API built with Spring Boot (Java)
- ⚛️ Modern frontend with React and TailwindCSS
- 📈 Market analytics and financial metrics
- 🛡️ User authentication and authorization (Spring Security)
- 🗃 PostgreSQL database
- 📄 Admin dashboard for managing properties and data

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Java 21+](https://adoptopenjdk.net/)
- [PostgreSQL](https://www.postgresql.org/)
- [Python 3.10+](https://www.python.org/)
- Maven (included via `./mvnw` wrapper)

### Clone the Repository

```bash
git clone https://github.com/your-username/property-pulse.git
cd property-pulse
```

### Frontend Setup (React)

```bash
cd client
npm install
npm run dev
```

Runs the React development server at http://localhost:5173

### Backend Setup (Java Spring Boot)

```bash
cd backend-java
./mvnw spring-boot:run
```

Visit the backend at http://localhost:8080

**Endpoints available:**

- `GET /health` → `{ "health": "healthy" }`
- `GET /` → Renders a static HTML page

## 🤖 AI/ML Engine (Python)

Coming soon – Python scripts for ML models will live in `ml-python/`.

**Planned features:**

- Investment score prediction
- Price forecasting
- Risk assessment models

## 🗃 Database

**PostgreSQL**

Scripts and config files located in `/db`

**Note:** You can run without PostgreSQL temporarily by disabling JPA in `application.properties`.

## 🔒 Environment Variables

- **Java backend:** `backend-java/src/main/resources/application.properties`
- **Python backend:** `.env` or config in `ml-python/`
- **Frontend:** `.env` files for secrets or API URLs

## 🧪 Tests

- **Java:** Run tests with `./mvnw test`
- **Python:** To be added
- **Frontend:** To be added

## 📌 Roadmap

- [ ] Finish ML model integration
- [ ] User dashboard
- [ ] Add property listings and visualizations
- [ ] Admin panel and property management
- [ ] CI/CD pipeline setup
