## ☁️ Cloud Deployment Overview

Our full-stack application is fully deployed and accessible online through a combination of cloud platforms. The deployment ensures continuous availability, easy updates, and a smooth developer experience.

### 🔙 Backend – Render
- **Platform:** [Render](https://render.com)
- **Service:** Node.js (Express.js) REST API
- **Features:**
  - Auto-deploy on Git push
  - Environment variables for secure config
  - Public API endpoint for frontend to access
- **Use case:** Handles all core backend logic including authentication, bookings, provider/customer management, and data routing.

### 🗄️ Database – Railway
- **Platform:** [Railway](https://railway.app)
- **Service:** Cloud-hosted MySQL `v8.0`
- **Features:**
  - Easy setup and instant deployment
  - Accessible from both local and deployed backend
  - Supports secure credentials and SSL access
- **Use case:** Stores user data, booking info, provider profiles, and more.

### 🌐 Frontend – Vercel
- **Platform:** [Vercel](https://vercel.com)
- **Framework:** React `v18.2.0`
- **Features:**
  - GitHub integration for instant deployment
  - Fast CDN delivery and HTTPS by default
  - Auto rebuilds on frontend code changes
- **Use case:** Serves the user interface for all roles (Customer / Provider), and connects directly to the backend API.

---

✅ *This deployment setup enables a production-ready system with separated concerns, allowing scalable updates and smooth collaboration between frontend, backend, and database services.*
