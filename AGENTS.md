# Project Overview

React + TypeScript + Vite. Architecture: Feature-Sliced Design (FSD).

# Testing Instructions

- We use Vitest + React Testing Library.
- Run all tests: `npm run test`
- Run a single test: `npx vitest run -t "<test_name>"`
- **Important:** Agents auto-execute test commands found here.

# Code Style & Rules

- TypeScript strict mode. No `any`.
- Test behavior, not implementation details.
- Mock API calls, but do not mock React hooks unless necessary.
- Use `renderHook` for testing custom hooks.

# Boundaries

- Never modify `vite.config.ts` without asking.
- Never commit `.env` files.

# FSD Rules

- Cross-imports between features are ALLOWED for composition.
