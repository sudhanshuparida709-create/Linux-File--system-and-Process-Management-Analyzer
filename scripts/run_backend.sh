#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"

echo "Starting Linux File System Backend..."

if [ ! -d "$BACKEND_DIR" ]; then
    echo "Error: Backend directory not found: $BACKEND_DIR"
    exit 1
fi

cd "$BACKEND_DIR"

if [ -f "package.json" ]; then
    if [ ! -d "node_modules" ]; then
        echo "Installing backend dependencies..."
        npm install
    fi

    npm run dev
elif [ -f "requirements.txt" ]; then
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv
    fi

    source venv/bin/activate
    pip install -r requirements.txt

    if [ -f "app.py" ]; then
        python app.py
    elif [ -f "main.py" ]; then
        python main.py
    else
        echo "Error: No app.py or main.py found."
        exit 1
    fi
else
    echo "Error: No package.json or requirements.txt found in backend."
    exit 1
fi