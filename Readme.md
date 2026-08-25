# AutoSave Systems Queueing System

A simple queueing system developed by **AutoSave Systems Inc.**

---

## Technologies Used

* Docker
* PHP 8
* Laravel 12
* React 19
* Laravel Reverb (WebSockets)
* Laravel Echo (WebSockets)
* Redis (Queue & Cache)
* MySQL
* QZ Tray (silent printing)

---

## Requirements

Before installing the system, make sure the following are installed:

* Docker
* PHP 8.x
* Composer
* Git
* Node.js & npm
* Git Bash (Windows)

---

## Installation

### 1. Set Up the Server

First, set up the server using the following repository:

[AutoSave Server](https://github.com/ricolito1994/as-server)

Follow the installation instructions in that repository before proceeding with **as-queue**.

### 2. Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd as-queue
```

### 3. Build the Docker Containers

Build the containers:

```bash
docker compose build --no-cache
```

### 4. Start the Containers

Start all services in detached mode:

```bash
docker compose up -d
```

### 5. Run the Setup Script

After the containers are running, execute:

```bash
./setup.sh
```

The setup script will handle the required installation and initial configuration, including:

* Installing dependencies
* Setting up the MySQL database
* Running database migrations
* Other required application setup

---

## Sample Users

Sample users can be found in:

```text
asq-auth-service/database/seeders/UserSeeder.php
```

> **Note:** The sample users and seeders are subject to change based on the company's requirements.

---

# Frontend

## Frontend Installation

Open Git Bash and navigate to the project root:

```bash
cd as-queue
./frontend.sh
```

The script will provide two options:

```text
1. Local / Development
2. Production
```

Choose:

* **1** for local/development installation
* **2** for production installation

For production installation, the script will retrieve the server's static IP address and configure the frontend accordingly.

---

## Running the Frontend Locally

For local development and hot reload:

```bash
cd asq-frontend
npm run dev
```

The frontend can then be accessed at:

```text
http://localhost:5173/asqueue
```

---

# Development

## Accessing a Container

You can access a running container using either Git Bash or Docker Desktop.

### Using Git Bash

```bash
docker exec -it <container_name> bash
```

### Using Docker Desktop

1. Open Docker Desktop.
2. Navigate to **Containers**.
3. Select the required service/container.
4. Open the **Exec** tab.
5. Run your commands inside the container.

---

## Applying Laravel Changes

When modifying or creating API routes in:

```text
routes/web.php
routes/api.php
```

you may need to clear or rebuild Laravel's cached configuration/routes.

Run:

```bash
php artisan optimize
```

Or, if only the routes were modified:

```bash
php artisan route:clear
```

---

# Database

The application uses **MySQL**.

You can use any MySQL database management tool, such as:

* MySQL Workbench
* DBeaver
* Another MySQL-compatible database client

Database credentials can be found in:

```text
.env.example
.env
```

> **Important:** Do not commit `.env` or other files containing actual credentials to the repository.

---

# QZ Tray

The application uses **QZ Tray** for silent printing.

QZ Tray is an external application that allows the system to communicate directly with printers without requiring the browser's standard print dialog.

Download QZ Tray from:

https://qz.io/download/

Install QZ Tray on the machine that will be performing the printing.

---

# Testing

To run the automated test suites for the microservices, open Git Bash from the project root and run:

```bash
./tests.sh
```

This will execute the available test cases for each microservice.

---

# Project Structure

The project consists of multiple services, including the queueing application and supporting microservices.

The main components include:

* **Queueing System** — Handles queue management and queue operations.
* **Authentication Service** — Handles users and authentication.
* **Redis** — Handles queues, caching, and related background processing.
* **MySQL** — Stores application data.
* **Reverb / Echo** — Provides real-time WebSocket communication.
* **QZ Tray** — Handles silent printing.

---

# Notes

* Make sure Docker is running before executing the installation scripts.
* Make sure the **as-server** repository is configured before setting up **as-queue**.
* Environment-specific configuration should be placed in `.env`.
* Sample seeders may change depending on the company's requirements.
