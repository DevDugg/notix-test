# Notix Test Task - Senior Frontend Developer

## Project Overview

This is a Next.js application built to fulfill a frontend test task. The primary feature is a real-time search page that fetches and displays results as the user types, while also updating the URL query parameters. The project is built with a strong emphasis on modern React architecture, performance, accessibility, and user experience, demonstrating senior-level frontend engineering practices.

## Core Features

- **Real-Time Search:** Results are fetched and displayed as the user types.
- **URL Synchronization:** The search query is synchronized with the `?q=` URL query parameter.
- **Race Condition Handling:** Uses `AbortController` to ensure that only the results from the latest request are displayed.
- **Full Keyboard Navigation:** Users can navigate, select, and dismiss results using only the keyboard (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
- **Instant Search Focus:** Users can start typing from anywhere in the application to focus the search input.
- **Client-Side Caching:** Subsequent searches for the same term are served instantly from an in-memory cache.
- **Polished UI/UX:** Features a clean design with fluid animations for all state transitions.

## Technical Architecture

The application is architected to be highly modular, reusable, and maintainable, following modern React best practices.

### Architectural Principles

- **Composition over Inheritance:** The UI is built from small, focused, and reusable components.
- **Separation of Concerns:**
  - **State Management vs. View:** All complex state and business logic is managed by a central `SearchProvider` using the React Context API. Components are simple consumers of this context.
  - **Logic vs. Presentation:** Logic is encapsulated in custom hooks (`useSearch`, `useKeyboardNavigation`, `useTypeToFocus`), leaving components to focus on rendering.
  - **Client vs. Server:** The main page (`page.tsx`) is a React Server Component, ensuring a fast initial load. All interactivity is delegated to client components.
- **Performance Optimization:**
  - **Debouncing:** User input is debounced to prevent excessive API requests.
  - **Memoization:** `React.memo` and `useCallback` are used to prevent unnecessary rerenders.
  - **Pure CSS Animations:** All animations are handled by performant, hardware-accelerated CSS transitions and animations.

### Key Components & Hooks

- **`SearchProvider` (`/src/contexts/search-context.tsx`)**: The central "brain" of the application. It uses a suite of custom hooks to manage all state, side effects, and logic for the entire search feature.

- **Custom Hooks (`/src/hooks/`)**:

  - **`useSearch`**: Manages data fetching, caching, and race conditions using `AbortController` and `useReducer` for atomic state updates.
  - **`useKeyboardNavigation`**: A generic hook that encapsulates all logic for keyboard navigation of a list.
  - **`useTypeToFocus`**: A generic hook that provides the "type-to-search" global focus functionality.
  - **`useDebouncedCallback`**: A utility hook that debounces a callback function.

- **API Route (`/src/app/api/search/route.ts`)**: A mock Next.js API route that simulates a network delay and returns filtered search results. It features a robust, centralized error-handling system using a Higher-Order Function.

## Getting Started

### Prerequisites

- Bun (`^1.0.0`)

### Installation & Running

1.  **Install dependencies:**

    ```bash
    bun install
    ```

2.  **Run the development server:**
    ```bash
    bun run dev
    ```

The application will be available at `http://localhost:3000`.

### Running Tests

The project is configured to use Bun's built-in test runner.

```bash
bun test
```
