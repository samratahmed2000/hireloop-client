<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Early-stage Next.js App Router frontend for a job portal. Only `/` (`app/page.tsx`, still a stub) and `/api/auth/[...all]` are implemented; `components/shared/Navbar.tsx` is also a stub, and most of `components/ui/` is an unused shadcn component library. `Project-Requirements.md` is the product spec for planned routes — it is gitignored, so don't assume its pages exist or commit it.

## Commands

- `npm run dev` | `npm run build` | `npm run start`
- `npm run typecheck` — `tsc --noEmit`; passes today.
- `npm run lint` — plain ESLint; Next 16 removed `next lint`. Baseline currently has 2 pre-existing errors in `components/ui/carousel.tsx` and `hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`). Don't attribute them to unrelated changes. For a focused check, run `npx eslint <path>`.
- `npm run format` — Prettier on `**/*.{ts,tsx}` only. Style: no semicolons, double quotes, LF, 2 spaces; Tailwind classes are auto-sorted using `app/globals.css`.
- No test runner, test script, or CI. Verify with `npm run typecheck && npm run build`, plus lint on touched files.

## Stack and layout

- Next.js 16.4.4 / React 19.3 / Tailwind 4.3; TypeScript is strict. `@/*` maps to the repo root.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens and the dark variant live in `app/globals.css` (`@theme`, `@custom-variant dark`); don't add a JS config.
- UI uses the shadcn `base-nova` style built on `@base-ui/react`, not Radix. Add components with `npx shadcn add <name>` (uses the installed CLI and `components.json`). `cn` comes from the `cn` package (re-exported by `lib/utils.ts`); don't introduce `clsx`/`tailwind-merge`.
- `app/layout.tsx` wraps pages in `components/theme-provider.tsx` (next-themes). Pressing `d` outside a form field toggles dark mode.
- Code blocks are highlighted client-side by Shiki with the JavaScript regex engine; register any new language in `lib/highlighter.tsx` (`languages` map).

## Auth and environment

- Better Auth is wired in `lib/auth.ts` (MongoDB adapter, hard-coded DB `hireloopDB`), mounted at `app/api/auth/[...all]/route.ts`; browser helpers live in `lib/auth-client.ts`.
- `.env` is gitignored and needs `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `MONGODB_URI`. The Mongo client is created at import time, so dev/build fails without `MONGODB_URI`.
- Social providers in `lib/auth.ts` also expect `GOOGLE_*`, `GITHUB_*`, `DISCORD_*`, `LINKEDIN_*`, and `TWITTER_*` client id/secret pairs. They are not set, so builds warn and those sign-ins fail until credentials are added.
- Never commit `.env*`, `Project-Requirements.md`, or `hireloop.fig`; the latter two are local design/spec assets ignored by git.

## Next.js 16 gotchas

- Turbopack is the default for `next dev` and `next build`; don't add `--turbopack`.
- `next build` does not run ESLint; run `npm run lint` separately.
- `params`, `searchParams`, `cookies`, and `headers` are async — `await` them.
- Use `proxy.ts` for request interception; `middleware.ts` is deprecated. The proxy runtime is Node.js only.
- Verify APIs against `node_modules/next/dist/docs/` (start with `01-app/02-guides/upgrading/version-16.md`); training data may be stale.
