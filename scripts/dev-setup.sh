#!/bin/bash

# School Management Platform - Development Setup Script (Bash)
# This script sets up the development environment

echo "🚀 Setting up School Management Platform Development Environment..."

# Check if Node.js is installed
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Check if Docker is installed
echo "🐳 Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker from https://www.docker.com/"
    exit 1
fi

DOCKER_VERSION=$(docker --version)
echo "✅ Docker version: $DOCKER_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
echo "⚙️ Setting up environment..."
if [ ! -f ".env" ]; then
    cp env.example .env
    echo "✅ Created .env file from env.example"
else
    echo "✅ .env file already exists"
fi

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d postgres

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Generate Prisma clients
echo "🔧 Generating Prisma clients..."
cd services/user-service
npx prisma generate
cd ../academic-service
npx prisma generate
cd ../..

echo "✅ Development environment setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Run 'npm run dev' to start all services"
echo "2. Run 'docker-compose up' to start with Docker"
echo "3. Visit http://localhost:3000 to see the application"
echo ""
echo "📚 For more information, check the README.md file"
