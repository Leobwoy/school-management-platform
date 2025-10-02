# School Management Platform - Development Setup Script (PowerShell)
# This script sets up the development environment

Write-Host "🚀 Setting up School Management Platform Development Environment..." -ForegroundColor Green

# Check if Node.js is installed
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if Docker is installed
Write-Host "🐳 Checking Docker installation..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker version: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker from https://www.docker.com/" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Copy environment file
Write-Host "⚙️ Setting up environment..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item "env.example" ".env"
    Write-Host "✅ Created .env file from env.example" -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Start Docker services
Write-Host "🐳 Starting Docker services..." -ForegroundColor Yellow
docker-compose up -d postgres

# Wait for database to be ready
Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Generate Prisma clients
Write-Host "🔧 Generating Prisma clients..." -ForegroundColor Yellow
Set-Location services/user-service
npx prisma generate
Set-Location ../academic-service
npx prisma generate
Set-Location ../..

Write-Host "✅ Development environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Run 'npm run dev' to start all services" -ForegroundColor White
Write-Host "2. Run 'docker-compose up' to start with Docker" -ForegroundColor White
Write-Host "3. Visit http://localhost:3000 to see the application" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more information, check the README.md file" -ForegroundColor Cyan
