# Full Stack Playground

## 🏗️ Monorepo Architecture

Project is structured as a **Turborepo** workspace:

- **`apps/web`**: Next.js 16 App Router application (`@repo/web`).

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js LTS
- `pnpm` (v12+)
- PostgreSQL running locally

### 1. Installation

Install all workspace dependencies from the root directory:

```bash
pnpm install

```

### 2. Environment Setup

Create a `.env` file in the **root directory**:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/shop"

```

### 3. Database Setup & Seeding

Sync database schema and seed initial data for the web workspace:

```bash
# Push schema to PostgreSQL
pnpm --filter @repo/web exec prisma db push

# Seed initial data
pnpm --filter @repo/web exec prisma db seed

```

### 4. Generate Prisma Client

Generate Prisma Client types:

```bash
pnpm --filter @repo/web exec prisma generate

```

### 5. Run Application

Start the dev environment via Turborepo:

```bash
pnpm dev

```

---

## 🗄️ Database Workflows (Prisma)

All database operations run via pnpm workspace filters targeting `apps/web`:

### Sync schema after manual changes in PostgreSQL

```bash
# 1. Pull database structure into schema.prisma
pnpm --filter @repo/web exec prisma db pull

# 2. Re-generate TypeScript types
pnpm --filter @repo/web exec prisma generate

```

### Push changes from `apps/web/prisma/schema.prisma` to Database

```bash
pnpm --filter @repo/web exec prisma db push

```

### Seed Database

```bash
pnpm --filter @repo/web exec prisma db seed

```

### GUI Database Management (Prisma Studio)

```bash
pnpm --filter @repo/web exec prisma studio

```
