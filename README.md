# Kevent - Event Management System

![Kevent Banner](https://ibb.co/zkQ37RG)

Kevent is a modern event management platform built with **Next.js**. It allows users to create, manage, and register for events seamlessly. Whether you're organizing a conference, workshop, or social gathering, Kevent makes it easy to handle event logistics and registrations.

---

## Table of Contents

1. [Features](#features)
2. [Live Demo](#live-demo)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Folder Structure](#folder-structure)

---

## Features

- **Create Events**: Users can add events with details like title, description, date, location, and more.
- **Browse Events**: Explore a list of upcoming events and view their details.
- **Event Registration**: Register for events with a simple form.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Fast and Scalable**: Built with Next.js for server-side rendering and optimal performance.

---

## Live Demo

Check out the live demo of Kevent: [https://kevent.vercel.app](https://kevent.vercel.app) <!-- Replace with your live demo URL -->

---

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS (or your preferred CSS framework)
- **Backend**: Next.js API routes
- **Database**: PostgreSQL/MySQL/MongoDB (or your chosen database)
- **Authentication**: NextAuth.js (or your preferred authentication library)
- **Deployment**: Vercel (or your preferred hosting platform)

---

## Getting Started

Follow these steps to set up Kevent locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A database setup (e.g., PostgreSQL, MySQL, or MongoDB)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/kevent.git
   cd kevent

   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install

   ```

3. **Set up environment variables**:

   Create a .env.local file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000

   ```

4. **Run migrations**:

   ```bash
   npx prisma migrate dev --name init

   ```

5. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev

   ```

6. **Open your browser**:

   Visit http://localhost:3000 to view the application.

---

### Folder Structure

Here’s an overview of the project structure:

    kevent/
    ├── components/     # Reusable React components
    ├── pages/          # Next.js pages and API routes
    ├── styles/         # CSS or Tailwind styles
    ├── prisma/         # Prisma schema and migrations (if using Prisma)
    ├── lib/            # Utility functions and helpers
    ├── public/         # Static assets (images, fonts, etc.)
    ├── .env.local      # Environment variables
    ├── next.config.js  # Next.js configuration
    └── package.json    # Project dependencies
