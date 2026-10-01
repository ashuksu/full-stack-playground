# Live-Entertainment Monorepo PoC — Roadmap

## Implementation Checklist

- [x] **Phase 1 (Completed)**: Turborepo, Next.js (`apps/web`), Prisma, and PostgreSQL configured.
- [ ] **Phase 2 (`apps/server`)**: Express + Socket.io (chat, donations) and LiveKit token generation endpoint.
- [ ] **Phase 3 (`apps/streamer`)**: Vite SPA for the broadcaster with webcam capture via LiveKit SDK.
- [ ] **Phase 4 (`apps/web`)**: Stream player, real-time chat, balance management (Zustand), and data caching (TanStack Query).
- [ ] **Phase 5 (Final Integration & Theory)**: End-to-end verification and tech interview topic breakdown (WebRTC/SFU, WebSockets, Hydration, Performance).

## Architecture Overview

```text
full-stack-playground/
├── apps/
│   ├── web/           # Next.js 16 (App Router + FSD) — Viewer App
│   ├── streamer/      # Vite + React 19 — Broadcaster Dashboard
│   └── server/        # Node.js + Express — Socket.io & LiveKit Token Service
├── .env               # Shared environment variables
├── package.json       # Monorepo root scripts & shared devDependencies
├── pnpm-workspace.yaml# Workspace package mapping (`apps/*`)
└── turbo.json         # Turborepo task pipeline configuration

```

---

## Tech Stack Alignment

| Scope                               | Technologies / Libraries                                                    |
| ----------------------------------- | --------------------------------------------------------------------------- |
| **Monorepo Architecture**           | Turborepo, pnpm Workspaces                                                  |
| **Viewer App (`apps/web`)**         | Next.js 16 (App Router), React 19, Tailwind CSS, FSD                        |
| **Streamer App (`apps/streamer`)**  | Vite, React 19, Tailwind CSS                                                |
| **Backend Service (`apps/server`)** | Node.js, Express, Socket.io, `livekit-server-sdk`                           |
| **Real-time & Video**               | WebSockets (`socket.io` / `socket.io-client`), WebRTC / SFU (LiveKit Cloud) |
| **State & Data Fetching**           | TanStack Query v5, Zustand                                                  |
| **Database**                        | PostgreSQL, Prisma ORM                                                      |

---

## Phased Milestones

### Phase 1: Workspace Foundation & Database

- **Technologies**: Turborepo, pnpm, Next.js 16, Prisma ORM, PostgreSQL.
- **Goal**: Set up monorepo orchestration and verify database connectivity.
- **Status**: Completed (`apps/web` running with FSD, root `.env` configured, Prisma connected).

### Phase 2: Backend Real-Time & Token Service (`apps/server`)

- **Technologies**: Node.js, Express, Socket.io, `livekit-server-sdk`.
- **Goal**:

1. Set up Express server on port 4000.
2. Implement Socket.io handlers for chat messaging, room tracking, and donation alerts.
3. Create `/api/livekit/token` endpoint to issue JWT access tokens for video streams.

### Phase 3: Broadcaster Application (`apps/streamer`)

- **Technologies**: Vite, React 19, `livekit-client`, `@livekit/components-react`.
- **Goal**:

1. Scaffold lightweight Vite SPA.
2. Implement WebRTC publisher component to capture camera/mic and stream to LiveKit SFU.

### Phase 4: Viewer Application & Client State (`apps/web`)

- **Technologies**: Next.js 16, TanStack Query, Zustand, `socket.io-client`, `@livekit/components-react`.
- **Goal**:

1. Render LiveKit stream player component for viewers.
2. Connect Socket.io client for live chat and donation popups.
3. Manage user balance with Zustand (optimistic balance deduction on donation).
4. Fetch and cache stream details using TanStack Query.

### Phase 5: Technical Interview Talking Points & Demo Verification

- **Focus**: Real-time architecture, Next.js hydration, and performance optimization.
- **Goal**:

1. Verify end-to-end flow: Broadcaster -> SFU Server -> Viewer App + Real-time Chat.
2. Review core technical concepts: SFU vs P2P, WebSockets reconnection handling, SSR/CSR hydration boundaries, and state isolation.
