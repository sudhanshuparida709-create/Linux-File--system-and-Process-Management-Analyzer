#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

echo "=========================================="
echo " Linux File System Project Setup"
echo "=========================================="

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js is not installed."
    exit 1
fi

# Check npm
if ! command -v npm >/dev/null 2>&1; then
    echo "Error: npm is not installed."
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Setup backend
if [ -d "$BACKEND_DIR" ]; then
    echo ""
    echo "Setting up backend..."

    cd "$BACKEND_DIR"

    if [ -f "package.json" ]; then
        npm install
    elif [ -f "requirements.txt" ]; then
        if ! command -v python3 >/dev/null 2>&1; then
            echo "Error: Python 3 is not installed."
            exit 1
        fi

        python3 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
        deactivate
    else
        echo "Warning: No supported backend dependency file found."
    fi
else
    echo "Warning: Backend directory not found."
fi

# Setup frontend
if [ -d "$FRONTEND_DIR" ]; then
    echo ""
    echo "Setting up frontend..."

    cd "$FRONTEND_DIR"

    if [ -f "package.json" ]; then
        npm install
    else
        echo "Error: Frontend package.json not found."
        exit 1
    fi
else
    echo "Error: Frontend directory not found."
    exit 1
fi

echo ""
echo "=========================================="
echo " Setup completed successfully!"
echo "=========================================="
echo "Run backend:  ./scripts/run_backend.sh"
echo "Run frontend: ./scripts/run_frontend.sh"