# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development Commands
```bash
# Start development environment (frontend + backend)
./start-dev.sh

# Frontend development only
npm run dev

# Type checking
npm run type-check

# Linting and formatting
npm run lint
npm run lint:fix
npm run format

# Build for production
npm run build
```

### Testing Commands
```bash
# Run tests (if using vitest)
npx vitest

# Run tests with coverage
npx vitest --coverage
```

## Project Architecture

### Tech Stack
- **Frontend**: Vite + React 19 + TypeScript
- **UI Framework**: Material-UI (MUI) v7 with custom dark theme
- **Routing**: React Router v7
- **HTTP Client**: Axios for API communication
- **Backend Mock**: JSON Server (port 3001)
- **Build Tool**: Vite with custom configuration

### Key Architecture Patterns
- **SPA with Admin Panel**: Single application with public frontend and admin routes
- **Component-Based Architecture**: Reusable components in `/src/components`
- **Page-Based Routing**: Each major section is a separate page component
- **Type-Safe Development**: Full TypeScript implementation with comprehensive type definitions
- **Theme-Driven UI**: Centralized Material-UI theme configuration

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx     # Navigation with admin panel access
│   ├── TechHero.tsx   # Homepage hero section with 3D particles
│   ├── TechFeatures.tsx # Feature showcase with animations
│   └── Services.tsx   # Service offerings display
├── pages/              # Route components
│   ├── Home.tsx       # Landing page (currently unused, App.tsx handles)
│   ├── Products.tsx   # Product showcase grid
│   ├── Admin.tsx      # Full CRUD admin interface
│   ├── About.tsx      # Company information
│   └── Contact.tsx    # Contact form
├── services/          # API layer
│   └── api.ts         # Product CRUD operations with Axios
├── types/             # TypeScript definitions
│   ├── index.ts       # Core types (Product, Service, etc.)
│   └── global.d.ts    # Global type declarations
└── theme.ts           # Material-UI theme configuration
```

### Data Flow
- **API Layer**: Centralized in `src/services/api.ts` with Product CRUD operations
- **State Management**: Currently using React state, no external state management
- **Mock Data**: `server/db.json` provides JSON Server mock API
- **Environment Variables**: VITE_API_URL for API endpoint configuration

### Key Components
- **Admin Panel**: Full CRUD interface for product management with Material-UI dialogs
- **Product Grid**: Responsive product display with filtering capabilities
- **3D Particle Background**: Three.js integration for modern visual effects
- **Responsive Navigation**: Material-UI based navigation with admin access

### Styling System
- **Material-UI Theme**: Custom dark theme with blue accent colors
- **CSS Variables**: Primary colors defined in theme
- **Component Overrides**: Custom styling for MUI components (Cards, Dialogs, etc.)
- **Responsive Design**: Mobile-first approach with MUI grid system

### Development Workflow
1. **Environment Setup**: Use `./start-dev.sh` to start both frontend and backend
2. **Type Safety**: Run `npm run type-check` before commits
3. **Code Quality**: Use `npm run lint:fix` and `npm run format` for consistent code
4. **Testing**: Vitest configuration available for unit testing

### Environment Configuration
- **Development**: `VITE_API_URL=http://localhost:3001`
- **Production**: Update `VITE_API_URL` to production endpoint
- **Theme Colors**: Modify in `src/theme.ts` for consistent branding

### Build Configuration
- **Output Directory**: `build/` (configured in vite.config.ts)
- **Path Aliases**: `@/` maps to `src/` for clean imports
- **Source Maps**: Enabled for debugging
- **Global**: Configured for Three.js compatibility