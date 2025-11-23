# Projekt Valhalla V2

> *For the untamed, only the worthy remain.*

A modern fitness platform built on discipline, structure, and community-driven progress. Projekt Valhalla V2 is a complete rebuild designed for individuals who value consistent effort over quick fixes—a digital hall where warriors forge their path through structured trials.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)

---

## Overview

**Projekt Valhalla V2** is a refurbished fitness platform that delivers challenge-based training programs through a Norse mythology-inspired interface. This is not just another workout app—it's a complete ecosystem where discipline meets design, and where community drives evolution.

Built with Next.js 14 App Router, Supabase backend, and Framer Motion animations, this platform represents a modern approach to fitness programming that prioritizes structure, accountability, and aesthetic excellence.

### Core Philosophy

- **No shortcuts** – Only structured, brutally effective training protocols
- **Community-driven** – Warriors share progress, techniques, and feedback
- **For the relentless** – Built for those committed to consistent growth

---

## Features

### 🔐 Authentication System
- Secure email/password registration and login
- Username-based login support with profile integration
- Auto-redirect functionality for authenticated users
- Custom branded verification emails with dark theme
- Persistent session management via Supabase Auth
- Protected routes across the platform

### 🏠 Dynamic Home Experience
- Cinematic hero section with call-to-action
- Multiple animated content blocks with Norse runes
- Smooth scroll-triggered animations
- Responsive design optimized for all devices
- Strategic use of background imagery and overlays

### 💪 Program Selection Interface
- Interactive program cards with hover effects
- Three distinct training protocols:
  - **Ragnarok** – The ultimate battle for rebirth
  - **Berserkyr 5** – Five moves of fury (Coming Soon)
  - **Ascension Protocol** – Rise above, transform within (Coming Soon)
- Glow effects and animations unique to each program
- Mobile-optimized touch interactions

### 💬 Community Forum - "Hall of Echoes"
- Create and browse discussion threads with rich formatting
- Category-based organization system:
  - Progress Reports
  - Technique & Form
  - Nutrition
  - Success Stories
  - General Discussion
- Real-time engagement metrics (views, replies)
- Reply system with expandable long content
- Username integration from user profiles
- Advanced modal system with scroll-locking
- Fully responsive thread cards

### 📊 Live Statistics Dashboard
- Real-time thread count tracking
- Total registered warriors (users)
- Active users indicator with pulse animation
- Auto-refreshing stats every 30 seconds
- Scroll-triggered number animations

### 📖 About Page
- Comprehensive project philosophy
- Creator section with photo gallery
- Animated content sections with rune dividers
- Mission statement and target audience breakdown
- Fixed background with parallax effects

### 🎨 Design System
- Dark theme with strategic red accents
- Custom Metamorphous font for headings (Google Fonts)
- Spinning rune-wheel ambient effects
- Smooth page transitions via Framer Motion
- Responsive layouts for mobile, tablet, desktop
- Custom 404 page with brand consistency
- Fixed navigation header with conditional elements

### 🛡️ Technical Excellence
- Row Level Security (RLS) on all database tables
- Foreign key constraints with cascade operations
- Input validation and sanitization
- Protected API routes
- Optimized image formats (WebP)
- Performance-focused component architecture

---

## Tech Stack

### Frontend
- **Next.js 16.0.3** with App Router architecture
- **React 19.2.0** with modern Hooks patterns
- **Tailwind CSS 4.1.17** for utility-first styling
- **Framer Motion 12.23.24** for sophisticated animations
- **Font Awesome** for iconography
- **Google Fonts** (Metamorphous) for typography

### Backend & Infrastructure
- **Supabase** as Backend-as-a-Service
  - PostgreSQL database with advanced querying
  - Authentication and user management
  - Real-time subscriptions capability
  - Storage for media assets
- **Vercel** for deployment and hosting

### Developer Experience
- **ESLint 9** with Next.js configuration
- **PostCSS** with Tailwind integration
- **jsconfig.json** for path aliases
- Modern JavaScript (ES6+) syntax throughout

---

## Project Architecture

The application follows Next.js 14+ App Router conventions with a clean separation of concerns:

```
src/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page route
│   ├── forum/               # Community forum route
│   ├── home/                # Main home route
│   ├── programs/            # Program selection route
│   ├── layout.js            # Root layout with header logic
│   ├── page.js              # Landing page (Gate)
│   ├── not-found.js         # Custom 404 page
│   └── globals.css          # Global styles and animations
│
├── components/              # Reusable React components
│   ├── aboutpage/          # About page specific components
│   ├── forumpage/          # Forum specific components
│   │   ├── Forum.jsx       # Main forum logic
│   │   ├── HeroForum.jsx   # Forum hero section
│   │   └── StatsStrip.jsx  # Live statistics component
│   ├── homepage/           # Home page specific components
│   │   ├── Hero.jsx        # Main hero section
│   │   └── HomeBlock[1-4].jsx  # Content blocks
│   ├── programs/           # Program selection components
│   ├── Footer.jsx          # Site-wide footer
│   ├── Gate.jsx            # Login/Signup component
│   └── Header.jsx          # Navigation header
│
├── lib/                    # Utility libraries
│   └── supabaseClient.js   # Supabase configuration
│
└── data/                   # JSON data files
    └── ragnarokdata.json   # Program-specific data
```

---

## Database Schema

### Core Tables

**profiles**
- Stores user profile information
- Links to Supabase Auth users
- Contains username and email
- Auto-created via database trigger on signup

**forum_threads**
- Discussion threads created by users
- Includes title, content, category
- Tracks views and reply counts
- Auto-updated last_activity timestamp

**forum_replies**
- Replies to forum threads
- Links to both thread and user
- Content with character limits
- Timestamp tracking

### Key Features
- Automatic profile creation on user registration
- Auto-incrementing reply counts via triggers
- Foreign key relationships with cascade deletes
- Row Level Security policies for data protection

---

## Component Highlights

### Gate Component
The entry point for unauthenticated users featuring:
- Animated landing screen with logo and tagline
- Dual modal system for login/signup
- Form validation and error handling
- Support for both email and username login
- Auto-redirect for authenticated users

### Forum Component
A sophisticated discussion platform with:
- Thread creation with category selection
- Modal-based thread detail view
- Real-time view tracking
- Username fetching via database JOIN
- Advanced scroll-locking on modals
- Reply system with content truncation

### Header Component
Intelligent navigation system featuring:
- Fixed positioning with backdrop blur
- Authentication-aware UI elements
- Conditional logout button display
- Responsive hamburger menu for mobile
- Smooth route transitions

### StatsStrip Component
Live dashboard displaying:
- Real-time forum statistics
- Animated number counters
- Scroll-trigger effects via Framer Motion
- Pulsing active user indicator
- Auto-refresh functionality

---

## Authentication Flow

1. **User Registration**
   - User submits signup form with username, email, password
   - Supabase creates account in `auth.users` table
   - Database trigger auto-creates profile in `profiles` table
   - Verification email sent with custom branding

2. **Email Verification**
   - User receives branded email
   - Clicks confirmation link
   - Account status updated to verified

3. **Login Process**
   - User can login with email OR username
   - For username login: system queries `profiles` table for email
   - Retrieved email used for Supabase authentication
   - Session token created and stored
   - User redirected to `/home` route

4. **Session Persistence**
   - Auth state managed globally via Supabase client
   - Protected routes check authentication status
   - Auto-redirect to gate page if unauthenticated
   - Logout clears session and redirects to landing

---

## Design Philosophy

### Visual Language
- **Dark Foundation**: Black backgrounds create focus and intensity
- **Strategic Color**: Red accents symbolize strength and determination
- **Typography**: Metamorphous font evokes Norse mythology
- **Motion**: Purposeful animations enhance without distraction

### User Experience Principles
- **Progressive Disclosure**: Information revealed as needed
- **Responsive Design**: Seamless experience across all devices
- **Performance**: Optimized assets and lazy loading
- **Accessibility**: Semantic HTML and proper contrast ratios

### Animation Strategy
- **Scroll-Triggered**: Content animates into view naturally
- **Hover States**: Subtle feedback on interactive elements
- **Modal Transitions**: Smooth entry and exit animations
- **Loading States**: Clear feedback during async operations

---

## Performance Optimizations

- WebP image format for reduced file sizes
- Lazy loading of off-screen components
- Optimized Tailwind CSS build
- Efficient database queries with proper indexing
- Strategic use of React hooks to prevent re-renders
- Font optimization via next/font
- Image optimization via next/image (where applicable)

---

## Security Measures

- Row Level Security (RLS) on all Supabase tables
- Server-side validation of user inputs
- Secure password hashing via Supabase Auth
- Protected API routes with authentication checks
- CSRF protection through Supabase
- Sanitized user-generated content
- Secure environment variable management

---

## Future Roadmap

- **Program Content**: Full implementation of Berserkyr 5 and Ascension Protocol
- **Progress Tracking**: User dashboard with workout logging
- **Social Features**: User profiles and follower system
- **Mobile App**: Native iOS/Android applications
- **Advanced Analytics**: Detailed statistics and insights
- **Gamification**: Achievement system and leaderboards

---

## Live Deployment

This application is deployed and hosted on **Vercel**, providing:
- Global CDN distribution
- Automatic HTTPS
- Zero-config deployment
- Edge function support
- Analytics integration

---

## Tech Specs

- **Node.js**: 22+
- **Package Manager**: npm
- **Build Tool**: Next.js built-in
- **Deployment**: Vercel
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage

---

## Author

**Samarth Vats**  
- GitHub: [@samarthvats04](https://github.com/samarthvats04)
- Repository: [projekt-valhalla-v2](https://github.com/samarthvats04/projekt-valhalla-v2)
- Email: samarthvats004@gmail.com

---

## Acknowledgments

- **Supabase** for the robust backend infrastructure
- **Vercel** for seamless deployment and hosting
- **Framer Motion** for powerful animation capabilities
- **Norse Mythology** for aesthetic inspiration and thematic elements

---

## License

This project is open source and available under the **MIT License**.

---

<div align="center">

**Built with discipline. Forged in code. For the relentless.**

🏛️ **PROJEKT VALHALLA** 🏛️

*Only the worthy shall advance*

</div>
