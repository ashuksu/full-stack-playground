# Full Stack Playground

## 🚀 Local Development Setup

### Prerequisites

- Node.js LTS
- `pnpm` (v10+)
- PostgreSQL running locally

### 1. Installation

```bash
pnpm install

```

> If `pnpm` blocks build scripts, allow Prisma binaries:
>
> ```bash
> pnpm approve-builds --all
>
> ```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/shop"

```

### 3. Database Setup & Seeding

```bash
# Push schema to the database
pnpm exec prisma db push

# Seed initial data from prisma/products.json
pnpm exec prisma db seed

```

### 4. Generate Prisma Client

```bash
pnpm exec prisma generate

```

### 5. Run Application

```bash
pnpm dev

```

---

## 🗄️ Database Workflows (Prisma)

### Sync schema after changes made directly in PostgreSQL

_(e.g., via DBeaver, pgAdmin, or raw SQL)_

```bash
# 1. Pull database structure into schema.prisma
pnpm exec prisma db pull

# 2. Re-generate TypeScript types
pnpm exec prisma generate

```

### Push changes made in `prisma/schema.prisma` to Database

_(e.g., added a new model or field in schema)_

```bash
pnpm exec prisma db push

```

### Seed Database

```bash
pnpm exec prisma db seed

```

### GUI Database Management

```bash
pnpm exec prisma studio

```
