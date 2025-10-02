# School Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue)](https://www.typescriptlang.org/)

A comprehensive, production-ready School Management System built with modern microservices architecture.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker & Docker Compose
- PostgreSQL 15+ (or use Docker)

### Automated Setup (Recommended)
```bash
# Windows (PowerShell)
.\scripts\dev-setup.ps1

# Linux/Mac (Bash)
chmod +x scripts/dev-setup.sh
./scripts/dev-setup.sh
```

### Manual Setup
```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp env.example .env

# 3. Start database
docker-compose up -d postgres

# 4. Generate Prisma clients
cd services/user-service && npx prisma generate
cd ../academic-service && npx prisma generate
cd ../..

# 5. Start all services
npm run dev
```

### Docker Development
```bash
# Start all services with Docker
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment
```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d
```

## 🏗️ Architecture

This system follows a **microservices architecture** with the following components:

- **API Gateway** - Central entry point with authentication and routing
- **User Service** - Authentication, authorization, and user management
- **Academic Service** - Academic records, courses, and schedules
- **Frontend** - React-based web application

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React 18+, Material-UI
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
school-management-platform/
├── apps/
│   └── web/                 # React frontend with Material-UI
├── services/
│   ├── api-gateway/         # API Gateway with authentication
│   ├── user-service/        # User management & authentication
│   └── academic-service/    # Academic management & database
├── scripts/                 # Setup and utility scripts
├── docker-compose.yml       # Docker orchestration
├── env.example             # Environment variables template
└── README.md               # This file
```

## 🔧 Services Overview

### Frontend (React)
- **Port**: 3000
- **Technology**: React 18+, TypeScript, Material-UI
- **Features**: Responsive UI, routing, state management

### API Gateway
- **Port**: 4000
- **Technology**: Node.js, Express, TypeScript
- **Features**: Authentication, rate limiting, request routing

### User Service
- **Port**: 4001
- **Technology**: Node.js, Express, Prisma, PostgreSQL
- **Features**: User management, JWT authentication, role-based access

### Academic Service
- **Port**: 4002
- **Technology**: Node.js, Express, Prisma, PostgreSQL
- **Features**: Student management, academic records, timetables

### Database
- **Port**: 5432
- **Technology**: PostgreSQL 15
- **Features**: Relational database with comprehensive schema

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Docker
```bash
docker-compose up -d
```

### Production
Follow the deployment guide in `DEPLOYMENT.md`

## 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@school-management-platform.com or create an issue in this repository.
