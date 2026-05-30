# 🎬 Movie Recommendation System

A full-stack Movie Recommendation System built with **Angular**, **Node.js**, **Express.js**, and **MongoDB**. The application allows users to browse movies, manage profiles, maintain watchlists, mark favorites, and receive personalized movie recommendations based on their interests.

---

## 🚀 Features

### User Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### Profile Management
- Multiple User Profiles
- Profile Avatars
- PIN-Protected Profiles
- Profile Deletion

### Movie Management
- Browse Movies
- Search Movies by Title, Genre, or Director
- Filter and Sort Movies
- Movie Details Page
- Add New Movies

### Personalized Experience
- My List (Watchlist)
- Continue Watching
- Favorite Movies
- Genre-Based Recommendations

### Recommendation Engine
- Personalized recommendations based on favorite movies
- Fallback recommendations using top-rated movies

---

## 🛠️ Tech Stack

### Frontend
- Angular 17
- TypeScript
- Angular Router
- RxJS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt Password Hashing

### Database
- MongoDB Atlas / Local MongoDB

---

## 📁 Project Structure

```
movie-recommendation-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── seed.js
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/movie-recommendation-system.git
cd movie-recommendation-system
```

---

## Backend Setup

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

### Run Backend Server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

Backend will run on:

```text
http://localhost:5000
```

---

## Frontend Setup

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Run Angular Application

```bash
ng serve
```

or

```bash
npm start
```

Frontend will run on:

```text
http://localhost:4200
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|------------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/me | Get Current User |

### Profiles

| Method | Endpoint | Description |
|----------|------------|-------------|
| POST | /api/auth/profiles | Add Profile |
| DELETE | /api/auth/profiles/:id | Delete Profile |
| POST | /api/auth/profiles/:id/list | Toggle My List |

### Movies

| Method | Endpoint | Description |
|----------|------------|-------------|
| GET | /api/movies | Get All Movies |
| GET | /api/movies/:id | Get Movie Details |
| POST | /api/movies | Add Movie |
| POST | /api/movies/:id/favorite | Toggle Favorite |
| GET | /api/movies/recommendations/me | Get Recommendations |

---

## 🗄️ Database Models

### User

```javascript
{
  username,
  email,
  password,
  profiles: []
}
```

### Movie

```javascript
{
  title,
  description,
  genres,
  language,
  releaseYear,
  director,
  posterUrl,
  bannerUrl,
  videoUrl,
  averageRating
}
```

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing using Bcrypt
- Protected API Routes
- Profile PIN Protection
- Input Validation

---

## 🎯 Future Enhancements

- AI-Based Recommendation Engine
- Movie Reviews & Comments
- User Ratings System
- Social Sharing
- Admin Dashboard
- Watch History Analytics
- OTT Integration

---

## 📷 Screenshots

Add screenshots here:

```text
Home Page
Movie Details
Recommendations Page
Profile Management
```

---

## 👨‍💻 Author

Developed by **[Your Name]**

GitHub: https://github.com/yourusername

---

## 📄 License

This project is licensed under the MIT License.
