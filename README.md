# Echo 🪶

> **Echo** is a modern, premium Twitter clone featuring a sleek user interface, real-time interactions, and a fully functional backend. Built as part of the daily app build challenge.

## ✨ Features

- **Modern UI/UX:** Glassmorphism, smooth animations, and a vibrant neon dark mode.
- **Authentication:** Secure user registration and login using JWT.
- **Micro-interactions:** Interactive hover states and fluid transitions.
- **Post & Feed:** Create, view, and interact with tweets (Echoes).
- **Responsive Design:** Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or via Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhimlex13/daily-app-2026-06-02-twitter-clone.git
   cd daily-app-2026-06-02-twitter-clone
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/echo_daily_app
   JWT_SECRET=your_jwt_secret
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../client
   npm install
   ```
   Start the Vite dev server:
   ```bash
   npm run dev
   ```

## 📝 License
This project is licensed under the MIT License.
