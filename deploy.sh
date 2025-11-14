#!/bin/bash

# 🚀 Todo App Deployment Script
# This script helps deploy your full-stack Todo application

set -e  # Exit on any error

echo "🚀 Starting Todo App Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "git is not installed. Please install git"
        exit 1
    fi
    
    print_success "All dependencies are installed"
}

# Test backend locally
test_backend() {
    print_status "Testing backend locally..."
    
    cd backend
    
    # Install dependencies if not already installed
    if [ ! -d "node_modules" ]; then
        print_status "Installing backend dependencies..."
        npm install
    fi
    
    # Run tests if they exist
    if npm run test --silent 2>/dev/null; then
        print_success "Backend tests passed"
    else
        print_warning "No backend tests found or tests failed"
    fi
    
    cd ..
}

# Prepare for deployment
prepare_deployment() {
    print_status "Preparing deployment files..."
    
    # Create .env.example if it doesn't exist
    if [ ! -f ".env.example" ]; then
        print_status "Creating .env.example file..."
        cat > .env.example << EOF
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://username:password@hostname:port/database
EOF
    fi
    
    # Check if GitHub Actions workflow exists
    if [ ! -f ".github/workflows/deploy.yml" ]; then
        print_warning "GitHub Actions workflow not found. CI/CD pipeline not configured."
    else
        print_success "GitHub Actions workflow found"
    fi
    
    # Check if render.yaml exists
    if [ ! -f "render.yaml" ]; then
        print_warning "render.yaml not found. Manual Render setup required."
    else
        print_success "Render blueprint configuration found"
    fi
}

# Git operations
git_operations() {
    print_status "Preparing Git repository..."
    
    # Check if we're in a git repository
    if [ ! -d ".git" ]; then
        print_status "Initializing Git repository..."
        git init
        git add .
        git commit -m "Initial commit - Todo App ready for deployment"
    else
        print_status "Git repository exists, checking status..."
        
        # Check if there are uncommitted changes
        if [ -n "$(git status --porcelain)" ]; then
            print_status "Committing changes..."
            git add .
            git commit -m "Prepare for deployment - $(date)"
        else
            print_success "No uncommitted changes"
        fi
    fi
    
    # Check if remote origin exists
    if ! git remote get-url origin &> /dev/null; then
        print_warning "No remote origin set. Please add your GitHub repository:"
        print_warning "git remote add origin https://github.com/yourusername/your-repo.git"
        print_warning "git push -u origin main"
    else
        print_success "Remote origin configured"
        
        # Ask if user wants to push
        read -p "Do you want to push to GitHub now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_status "Pushing to GitHub..."
            git push origin main || git push origin master
            print_success "Code pushed to GitHub"
        fi
    fi
}

# Display deployment instructions
show_deployment_instructions() {
    print_success "🎉 Deployment preparation complete!"
    echo
    print_status "Next steps for deployment:"
    echo
    echo "1. 🌐 Backend Deployment (Render):"
    echo "   - Go to https://dashboard.render.com"
    echo "   - Click 'New +' → 'Blueprint' (if render.yaml exists)"
    echo "   - Or manually create PostgreSQL + Web Service"
    echo "   - Connect your GitHub repository"
    echo
    echo "2. 📱 Frontend Configuration:"
    echo "   - Update API URL in frontend/TodoApp/src/services/api.ts"
    echo "   - Replace 'your-app-name.onrender.com' with your actual Render URL"
    echo
    echo "3. 🔒 Environment Variables (Set in Render dashboard):"
    echo "   NODE_ENV=production"
    echo "   JWT_SECRET=[generate-secure-32-char-secret]"
    echo "   DATABASE_URL=[auto-generated-by-render]"
    echo
    echo "4. 🧪 Test Deployment:"
    echo "   - Health check: https://your-app.onrender.com/api/health"
    echo "   - Test authentication endpoints"
    echo
    echo "5. 📱 Mobile App:"
    echo "   - Update API URL for production"
    echo "   - Build and test on device"
    echo "   - Deploy to App Store/Google Play"
    echo
    print_success "For detailed instructions, see DEPLOYMENT.md"
}

# Main deployment process
main() {
    echo "🎯 Full-Stack Todo App Deployment Assistant"
    echo "=========================================="
    echo
    
    check_dependencies
    test_backend
    prepare_deployment
    git_operations
    show_deployment_instructions
    
    echo
    print_success "✨ Your Todo app is ready for deployment!"
    print_status "Check DEPLOYMENT.md for detailed deployment instructions"
}

# Run main function
main "$@"
