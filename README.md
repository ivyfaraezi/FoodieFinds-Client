# FoodieFinds - Local Food Lovers Network 🍽️

Discover, review, and share your favorite local food experiences. FoodieFinds connects food lovers with honest community-driven reviews to help you find hidden culinary gems near you.

## 🌐 Live Site URL

**[FoodieFinds](https://foodiefinds-450ce.web.app)**

---

## ✨ Key Features

- **🍔 Food Review System**: Write detailed food reviews with star ratings, food images, restaurant names, and location info — share your dining experience with the community.

- **🔍 Search Reviews**: Find specific food reviews by keyword search across food names, restaurant names, and review content.

- **❤️ Favorites / Watchlist**: Save reviews you love to your personal favorites list for quick access later. Easily manage and remove favorites.

- **📝 My Reviews Dashboard**: View, edit, and manage all the reviews you've posted from a dedicated dashboard page.

- **✏️ Update & Delete Reviews**: Full CRUD functionality — update your existing reviews or remove them when needed.

- **🔐 Secure Authentication**: Firebase-powered login with email/password and Google sign-in. Protected routes ensure only authenticated users can add reviews, manage favorites, and access private pages.

- **🌗 Dark / Light Mode**: Toggle between dark and light themes with a smooth transition. Theme preference persists across sessions.

- **🎬 Smooth Animations**: Framer Motion animations on page transitions, cards, and interactive elements for a polished user experience.

- **🎠 Hero Slider**: Eye-catching Swiper-powered hero banner with autoplay and fade effects showcasing food imagery.

- **📱 Fully Responsive**: Clean, modern UI built with Tailwind CSS that works seamlessly on desktop, tablet, and mobile devices.

---

## 📄 Pages & Routes

| Route                | Access  | Description                                                                  |
| -------------------- | ------- | ---------------------------------------------------------------------------- |
| `/`                  | Public  | Home page with hero slider, featured reviews, how it works, and testimonials |
| `/all-reviews`       | Public  | Browse all food reviews with search functionality                            |
| `/review/:id`        | Public  | Detailed view of a single review                                             |
| `/login`             | Public  | User login page                                                              |
| `/register`          | Public  | User registration page                                                       |
| `/add-review`        | Private | Submit a new food review                                                     |
| `/my-reviews`        | Private | View and manage your posted reviews                                          |
| `/update-review/:id` | Private | Edit an existing review                                                      |
| `/my-favorites`      | Private | View your saved favorite reviews                                             |

---

## 🛠️ Technologies Used

### Frontend

- **React 18** with **Vite** for fast development and builds
- **Tailwind CSS** for utility-first responsive styling
- **Framer Motion** for smooth animations and transitions
- **React Router DOM v6** for client-side routing with protected routes
- **Firebase Authentication** (Email/Password + Google sign-in)
- **Axios** for HTTP API requests
- **Swiper** for hero slider / carousel
- **React Hot Toast** & **SweetAlert2** for toast notifications and alerts
- **React Icons** for icon library
- **Lottie React** for animated illustrations
- **React Tooltip** for hover tooltips
- **React Simple Typewriter** for typewriter text effects
- **Recharts** for data visualization charts
- **React Helmet Async** for dynamic page titles and SEO

### Backend

- Node.js with Express
- MongoDB with MongoDB Atlas
- CORS for cross-origin requests
- dotenv for environment variables

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- A Firebase project with Authentication enabled
- Backend server running (see server repo)

### Installation

```bash
# Clone the repository
git clone https://github.com/ivyfaraezi/FoodieFinds-Client.git

# Navigate to the project
cd FoodieFinds-Client

# Install dependencies
npm install

# Create a .env file in the root (see below)

# Start the development server
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=your_backend_api_url
```

---

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Deploy to Firebase Hosting
firebase deploy
```

---

## 📄 License

This project is licensed under the MIT License.

---
