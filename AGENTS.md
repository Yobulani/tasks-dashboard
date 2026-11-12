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

# Architecrure & FSD Rules

- Cross-imports between features are ALLOWED for composition.
- RootState Import Exception: We consciously allow importing `RootState` from
  `@/app/store` (or `@/app/store/rootReducer`) into lower layers (`shared`,
  `entities`, `features`) using `import type`.
  - Why: This is the officially recommended pattern for integrating Redux with
    Feature-Sliced Design. Since `import type` is erased at runtime, it does not
    create a circular dependency.
  - Never try to "fix" this by moving `RootState` into `shared` or by redefining
    the state interface manually. This is intentional.

# Shadcn/ui Version (CRITICAL)

- **We use shadcn/ui built on top of Base UI (v4+).**
- **NEVER** install or use `@radix-ui/*` packages. The project does not have
  them and does not need them.
- When adding new shadcn components, use the existing CLI setup (it is already
  configured for Base UI).
- **Trigger/Render pattern:** Since we use Base UI, components use the `render`
  prop (e.g., `<DialogTrigger render={<Button />} />`) instead of Radix's
  `asChild`.
- If you need to check how a component works, look at existing files in
  `src/components/ui/` (e.g., `dialog.tsx`, `dropdown-menu.tsx`).
