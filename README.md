# Task Management

# NestJS & Vue 3 Fullstack Project

## Overview

This project is a full-stack web application built with NestJS for the backend and Vue 3 for the frontend. The backend uses Prisma and PostgreSQL, while the frontend utilizes Pinia for state management, Vue Query for data fetching, and TailwindCSS with ShadCN UI for styling.

## Tools and Technologies

### Frontend
- **Vue 3**: The Progressive JavaScript Framework.
- **Pinia**: State management library for Vue.
- **Vue Query**: Data fetching and state synchronization library.
- **TailwindCSS**: Utility-first CSS framework.
- **ShadCN UI**: A collection of styled components for TailwindCSS.

### Backend
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: Next-generation ORM for TypeScript and JavaScript.
- **PostgreSQL**: An open-source relational database.

## Getting Started

### Prerequisites

- **Docker**: Make sure Docker is installed and running on your machine.
- **Node.js**: Ensure you have Node.js installed for frontend development.

### Setup and Run the Project

1. **Clone the Repository**

   ```sh
   git clone https://github.com/ElayadeIsmail/Task-Management.git
   cd Task-Management
   ```

2. **Running Project**
   
  - Use Docker Compose to set up the entire application stack, including the backend and database

   ```sh
    docker-compose up --build -d
   ```

2. **Shut Down the Containers**

To stop and remove the containers, networks, and volumes created by up:

   ```sh
    docker-compose down
   ```

### Accessing the Application

- Frontend: The Vue 3 application will be live on `http://localhost:3000`.
- Swagger API Documentation: Accessible at `http://localhost:3000/api/docs`.

   

   
