#!/bin/bash

# Todo App Setup Script
echo "🚀 Setting up Todo App..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file for backend if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend .env file..."
    cp backend/.env backend/.env.example 2>/dev/null || echo "NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_app
DB_USER=postgres
DB_PASSWORD=password" > backend/.env
fi

# Start the application with Docker
echo "🐳 Starting application with Docker..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if backend is running
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is running at http://localhost:3000"
    echo "📊 API Health: http://localhost:3000/api/health"
else
    echo "❌ Backend failed to start. Check logs with: docker-compose logs backend"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📱 To run the React Native app:"
echo "   cd frontend/TodoApp"
echo "   npm install"
echo "   npx react-native run-ios    # for iOS"
echo "   npx react-native run-android # for Android"
echo ""
echo "🔧 Useful commands:"
echo "   docker-compose logs -f backend  # View backend logs"
echo "   docker-compose down            # Stop all services"
echo "   docker-compose up --build -d   # Rebuild and restart"
echo ""
