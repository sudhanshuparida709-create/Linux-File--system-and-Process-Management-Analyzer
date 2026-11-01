# Linux File System and Process Management

A web-based Linux system monitoring and management application for exploring the file system, monitoring system resources, and managing running processes.

## Features

### Dashboard
- CPU usage monitoring
- Memory usage monitoring
- Disk usage overview
- System resource statistics
- Process summary

### File System Management
- Browse directories and files
- View file information
- Explore directory structure
- Monitor storage usage

### Process Management
- View running processes
- Monitor process information
- Search and filter processes
- Terminate processes
- Pause and resume processes

## Technology Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

### Backend
- Configure according to the backend implementation.

### Development Tools
- Node.js
- npm
- Git
- Docker (optional)

## Project Structure

```text
linux-file-system_and _process_management/
│
├── backend/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── next.config.mjs
│
├── scripts/
│   ├── setup.sh
│   ├── run_backend.sh
│   └── run_frontend.sh
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Prerequisites

Install the following software:

- Node.js
- npm
- Git
- Python 3 (if the backend uses Python)
- Docker and Docker Compose (optional)

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd linux-file-system_and _process_management
```

Make the scripts executable:

```bash
chmod +x scripts/*.sh
```

Run the setup script:

```bash
./scripts/setup.sh
```

## Running the Application

### Start the Backend

Open a terminal in the project root:

```bash
./scripts/run_backend.sh
```

The backend is expected to run on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal:

```bash
./scripts/run_frontend.sh
```

Open the application:

```text
http://localhost:3000
```

## Environment Configuration

Create or update `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Linux File System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

Do not commit environment files containing secrets.

## Docker Setup

If Dockerfiles are available in both the backend and frontend directories, start the services using:

```bash
docker compose up --build
```

Stop the services:

```bash
docker compose down
```

## Frontend Commands

Run from the frontend directory:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

Check TypeScript:

```bash
npm run typecheck
```

## API Configuration

The frontend uses the following default backend URL:

```text
http://localhost:5000
```

Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` if your backend runs on a different address.

## Security Notes

- Process-management operations should be authorized.
- Validate all file-system paths on the backend.
- Do not expose unrestricted shell execution through the API.
- Keep sensitive configuration and credentials out of Git.
- Restrict destructive operations to authorized users.

## License

Add your preferred project license here.
