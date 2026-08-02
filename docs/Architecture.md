# DormDrop Architecture

# Tech Stack

Frontend

- React
- Vite
- Tailwind CSS
- React Router
- React Hot Toast
- Lucide React

Backend

- Node.js
- Express.js

Database

- MongoDB Atlas
- Mongoose

Storage

- Cloudinary

Authentication

- JWT

Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

---

# Folder Structure

frontend/

components/

pages/

hooks/

utils/

services/

assets/

backend/

config/

controllers/

middleware/

models/

routes/

utils/

server.js

---

# Frontend Architecture

App.jsx

↓

Listings State

↓

Pages

↓

Components

Single Source of Truth

App.jsx owns:

- listings
- favorites

---

# Backend Architecture

React

↓

Axios

↓

Express

↓

Controllers

↓

Models

↓

MongoDB

↓

Response

↓

React

---

# Image Flow

Frontend

↓

Cloudinary

↓

Image URL

↓

MongoDB

↓

React

---

# Authentication Flow

User Login

↓

JWT Token

↓

Protected Routes

↓

Authenticated APIs