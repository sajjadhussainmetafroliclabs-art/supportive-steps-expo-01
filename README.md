# Supportive Steps — Expo / React Native

This is a migration of the original **supervise-me-safe** web app (TanStack
Start + TanStack Router + Tailwind/shadcn) to a production-ready **Expo /
React Native** app, written in TypeScript.

## Getting started

```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR
code with Expo Go on a physical device.

## What was ported 1:1

- **All 21 screens** (routes) and their exact business logic, copy, and
  user flow — splash → onboarding → auth → role → verification → terms →
  pending → tabs (dashboard/search/notifications/profile/settings) →
  supervisor profile → write review → review submitted → edit profile →
  password-reset flow → change password.
- **Design tokens** — every color in the original `styles.css` (oklch) was
  converted to hex and centralized in `theme/tokens.ts`, for both light and
  dark mode. See the doc comment there for how they map back to the source.
- **Data layer** (`lib/data.ts`) — the original app had no real backend; all
  supervisor/review data was local mock data. It's ported unchanged, in a
  shape that's ready to swap for a real API via the already-wired
  `@tanstack/react-query` provider.
- **Component structure** — `ScreenHeader`, `StarRating`, `SupervisorCard`,
  and the shadcn/ui primitives actually used by the app (`Button`, `Input`,
  `Label`, `Textarea`, `Switch`, `Checkbox`) were ported with the same
  variant/size APIs.
- **Navigation model** — Expo Router (file-based, same mental model as
  TanStack Router). The 5 bottom-nav screens became a real native tab
  navigator (`app/(tabs)/_layout.tsx`), replacing the original's hand-rolled
  `BottomNav` component.

## Decisions made during migration (flagged for your review)

1. **Brand assets (logo/mark).** The original repo only contained
   `*.asset.json` pointers to images hosted on Lovable's CDN — the actual
   PNG binaries were never in the repo, so they couldn't be bundled as-is.
   `components/Logo.tsx` is an SVG recreation using the same brand colors
   instead. **Swap in the real exported PNGs** (via `expo-image`) when
   you have them — the component's public API (`<Logo size={64} />`,
   `<LogoLockup />`) won't need to change.

2. **Form validation.** The original web forms never actually validated or
   submitted anywhere (`onSubmit` just called `preventDefault()`, and
   `react-hook-form`/`zod` were installed but unused). Since there's no real
   backend, submitting still just navigates to the next screen — but each
   form now has real client-side validation via `react-hook-form` + `zod`
   (see `lib/validation.ts`), which felt like the right bar for
   "production-ready" without inventing any backend behavior that wasn't
   there before. If you'd rather they be pure visual stubs like the
   original, that's a quick revert per screen.

3. **`/all` dev-preview route was dropped.** It rendered every screen in
   iframes for visual QA in the browser — a web-only tool with no native
   equivalent purpose.

4. **Styling approach: NativeWind.** Chosen so the JSX stays close to the
   original Tailwind class names for easy side-by-side review, rather than
   converting everything to `StyleSheet.create` objects.

## Project structure

```
app/                    Expo Router screens (file-based routing)
  (tabs)/                 5 bottom-tab screens
  supervisor/[id].tsx      Dynamic route: supervisor profile
  review/[id].tsx          Dynamic route: write a review
  ...                      Auth/onboarding/settings stack screens
components/             Shared UI (ScreenHeader, StarRating, SupervisorCard, Logo, Screen)
  ui/                    Ported shadcn primitives (Button, Input, Label, Textarea, Switch, Checkbox)
theme/                   Design tokens + ThemeProvider (light/dark)
lib/                     data.ts (mock data), utils.ts (cn helper), validation.ts (zod schemas)
```

## Known follow-ups

- Replace the SVG `Logo`/`LogoLockup` with the real exported brand PNGs.
- When a real backend exists, replace `lib/data.ts` with `@tanstack/react-query`
  hooks — the provider is already wired up in `app/_layout.tsx`.
- App icons/splash images referenced in `app.json` (`assets/images/icon.png`,
  `splash-icon.png`, `adaptive-icon.png`, `favicon.png`) are not included —
  add your own before building for app stores.
- `npx expo install --check` is worth running once to pin exact versions
  compatible with your installed Expo SDK, since dependency versions above
  were pinned for SDK 52 at time of writing.
