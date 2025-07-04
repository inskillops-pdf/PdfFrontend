# AI Professionals University

A modern platform for AI education and certification.

## Features

- AI Certification Courses
- Membership System with Paid Tiers
- User Dashboard
- Payment Processing with Stripe
- Backend API Integration for User Management
- Firebase Authentication & Database

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn
- Firebase account
- Stripe account
- Backend API server running on port 8085 (or configure your own)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/aiprofessionalsuniversity.git
cd aiprofessionalsuniversity
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your configuration:

```
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8085

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the site.

## API Integration

The application now integrates with a backend API for user management. The API endpoints include:

- `POST /api/v1/auth/user/registerUser` - User registration
- `POST /api/v1/auth/token` - User login
- Additional endpoints for course management, payments, etc.

### User Registration

The signup form now collects the following information:

- First Name (required)
- Last Name (required)
- Email Address (required)
- Phone Number (optional)
- Role Type (required - STUDENT, INSTRUCTOR, ADMIN)
- Password (required)

The registration data is sent to the backend API using the `UserRegisterDTO` structure.

## Project Structure

```
├── public/              # Static files
│   └── images/          # Image assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── lib/             # Library code (Firebase, Stripe)
│   ├── models/          # TypeScript type definitions
│   ├── pages/           # Next.js pages
│   ├── services/        # API service classes
│   ├── styles/          # CSS files
│   └── utils/           # Utility functions
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
└── tailwind.config.js   # Tailwind CSS configuration
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Firebase](https://firebase.google.com/) - Authentication & Database
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Axios](https://axios-http.com/) - HTTP client for API calls
# PdfFrontend
# PdfFrontend
