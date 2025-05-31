#!/bin/bash
# 🚀 GROW YouR NEED - Production Deployment Script

set -e

echo "🔥 INFINITE GOD MODE - DEPLOYING GROW YouR NEED TO PRODUCTION 🔥"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
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

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE} $1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "🔍 CHECKING PREREQUISITES"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    print_success "Node.js $(node --version) found"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    print_success "npm $(npm --version) found"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed - skipping containerization"
    else
        print_success "Docker $(docker --version | cut -d' ' -f3 | cut -d',' -f1) found"
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed"
        exit 1
    fi
    print_success "Git $(git --version | cut -d' ' -f3) found"
}

# Install dependencies
install_dependencies() {
    print_header "📦 INSTALLING DEPENDENCIES"
    npm ci --production=false
    print_success "Dependencies installed successfully"
}

# Run tests
run_tests() {
    print_header "🧪 RUNNING TESTS"
    
    # Type checking
    print_status "Running TypeScript type checking..."
    npm run type-check
    
    # Linting
    print_status "Running ESLint..."
    npm run lint
    
    # Unit tests
    print_status "Running unit tests..."
    npm run test
    
    print_success "All tests passed!"
}

# Build application
build_application() {
    print_header "🏗️ BUILDING APPLICATION"
    
    # Set production environment
    export NODE_ENV=production
    export NEXT_TELEMETRY_DISABLED=1
    
    # Build the application
    npm run build
    
    print_success "Application built successfully"
}

# Deploy to Vercel
deploy_vercel() {
    print_header "🚀 DEPLOYING TO VERCEL"
    
    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel@latest
    fi
    
    # Deploy to production
    vercel --prod --confirm
    
    print_success "Deployed to Vercel successfully"
}

# Build Docker image
build_docker() {
    print_header "🐳 BUILDING DOCKER IMAGE"
    
    if ! command -v docker &> /dev/null; then
        print_warning "Docker not found - skipping Docker build"
        return
    fi
    
    # Build Docker image
    docker build -t grow-your-need:latest .
    
    # Tag with version
    VERSION=$(node -p "require('./package.json').version")
    docker tag grow-your-need:latest grow-your-need:$VERSION
    
    print_success "Docker image built successfully"
}

# Deploy with Docker Compose
deploy_docker() {
    print_header "🐳 DEPLOYING WITH DOCKER COMPOSE"
    
    if ! command -v docker-compose &> /dev/null; then
        print_warning "Docker Compose not found - skipping Docker deployment"
        return
    fi
    
    # Deploy with Docker Compose
    docker-compose up -d --build
    
    print_success "Deployed with Docker Compose successfully"
}

# Performance audit
performance_audit() {
    print_header "📊 RUNNING PERFORMANCE AUDIT"
    
    # Install Lighthouse CI if not present
    if ! command -v lhci &> /dev/null; then
        print_status "Installing Lighthouse CI..."
        npm install -g @lhci/cli@latest
    fi
    
    # Run Lighthouse CI
    lhci autorun
    
    print_success "Performance audit completed"
}

# Main deployment function
main() {
    print_header "🔥 STARTING DEPLOYMENT PROCESS"
    
    # Parse command line arguments
    DEPLOY_TARGET=${1:-"vercel"}
    SKIP_TESTS=${2:-"false"}
    
    print_status "Deployment target: $DEPLOY_TARGET"
    print_status "Skip tests: $SKIP_TESTS"
    
    # Run deployment steps
    check_prerequisites
    install_dependencies
    
    if [ "$SKIP_TESTS" != "true" ]; then
        run_tests
    fi
    
    build_application
    
    case $DEPLOY_TARGET in
        "vercel")
            deploy_vercel
            ;;
        "docker")
            build_docker
            deploy_docker
            ;;
        "all")
            deploy_vercel
            build_docker
            deploy_docker
            ;;
        *)
            print_error "Unknown deployment target: $DEPLOY_TARGET"
            print_status "Available targets: vercel, docker, all"
            exit 1
            ;;
    esac
    
    # Run performance audit
    performance_audit
    
    print_header "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
    print_success "GROW YouR NEED is now live in production!"
}

# Run main function with all arguments
main "$@"
