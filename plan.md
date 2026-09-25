Да, теперь цель сформулирована гораздо точнее.

Я бы зафиксировал проект именно как **interview playground**, а не как продукт и не как набор лабораторных тестов.

### Что это будет

Один небольшой Next.js проект, который выглядит как нормальное production-приложение по структуре, но его реальная
задача - дать нам место, где можно последовательно потрогать современные frontend/full-stack подходы.

При этом:

- каждая тема появляется в реалистичном контексте;
- страницы разделяют эксперименты и не создают конфликтов;
- названия компонентов, hooks, services, API и типов нормальные production-like;
- не будет `TestComponent`, `Example1`, `Foo`, `useTestHook` и т.п.;
- UI вторичен - Tailwind + shadcn/ui достаточно;
- backend и PostgreSQL будут настоящими;
- данные и связи будут реальными, а не массивом из трех объектов в `mock.ts`;
- можно специально делать разные реализации одной задачи и сравнивать trade-offs.

### App Router - да, это отдельная важная часть

`Next.js` - это framework.

`Next.js App Router` - современная модель построения приложения внутри Next.js, основанная на `app/` directory.

И именно здесь естественно изучать:

- Server Components
- Client Components
- layouts
- loading/error states
- Server Actions
- route handlers
- streaming
- hydration
- server/client boundaries
- data fetching
- caching

То есть **Next.js + App Router** я бы считал одной из центральных частей проекта, а не отдельной технологией "на потом".

---

# Как я бы разделил playground

Не делать одну гигантскую страницу.

Например, меню:

```text
Dashboard
Projects
Activity
Notifications
Messages
Search
Settings
```

И каждая страница естественно дает нам возможность изучить определенный набор вещей.

| Раздел             | Что изучаем                                                |
| ------------------ | ---------------------------------------------------------- |
| Dashboard          | Server Components, data fetching, caching, rendering       |
| Projects           | PostgreSQL, relations, filtering, sorting, pagination      |
| Activity           | TanStack Query, infinite queries, optimistic updates       |
| Notifications      | WebSockets, reconnect, stale data                          |
| Messages           | WebSockets, chat, optimistic UI, synchronization           |
| Search             | server-side filtering, debouncing, caching                 |
| Settings           | forms, validation, mutations, server/client boundaries     |
| отдельная страница | performance profiling, large lists, rendering optimization |

При этом это не означает, что каждая страница "посвящена технологии".

Например, `Projects` действительно может выглядеть как обычный production-раздел:

```text
Projects
├── list
├── filters
├── sorting
├── pagination
├── project details
├── members
└── activity
```

И внутри этой реальной задачи мы постепенно сталкиваемся с нужными технологиями.

---

# State management

Здесь особенно важно не использовать Zustand просто потому, что он есть в списке.

Можно получить естественное разделение:

### Local UI state

React:

```text
modal open/closed
selected tab
input state
dropdown state
```

### Client global state

Zustand:

```text
current workspace
UI preferences
sidebar state
selected project
notification preferences
```

### Server state

TanStack Query:

```text
projects
users
notifications
activity
messages
```

И тогда появляется действительно полезный вопрос для собеседования:

> Why is this state in Zustand and not in TanStack Query?

или:

> Why don't we put server data into Zustand?

Это намного полезнее, чем просто написать пару `create()` stores.

---

# Realtime

Здесь я бы сделал **настоящую realtime-функциональность**, а не отдельную страницу "WebSocket demo".

Например:

```text
Notifications
Messages
Activity
```

Один WebSocket connection может использоваться для нескольких типов событий:

```text
notification.created
message.created
message.updated
project.updated
user.presence_changed
```

И тогда естественно появляются:

- connection lifecycle
- reconnect
- exponential backoff
- temporary connection loss
- duplicate events
- stale events
- event ordering
- optimistic updates
- synchronization with TanStack Query
- invalidation/refetch
- local cache update
- conflicting updates

Вот это уже хороший interview material.

---

# PostgreSQL

Здесь я бы специально **не делал одну таблицу `users` и одну `posts`**.

Нужны нормальные relational data.

Например, концептуально:

```text
users
workspaces
workspace_members
projects
project_members
tasks
comments
notifications
messages
```

И relations между ними.

Тогда можно реально потрогать:

- joins
- nested relations
- filtering
- sorting
- pagination
- indexes
- transactions
- constraints
- server-side validation
- API design

И уже потом можно обсуждать, почему конкретный запрос устроен именно так.

---

# Performance

Это тоже лучше не выносить в отдельную "Performance Lab".

Например:

`Projects` со временем может получить:

```text
1000+ projects
large activity feed
filters
sorting
pagination
```

И тогда возникает реальная проблема:

> Why is this page slow?

И мы уже можем последовательно проверить:

- unnecessary re-renders
- React DevTools Profiler
- memoization
- component boundaries
- large lists
- pagination
- virtualization
- TanStack Query cache
- request waterfalls
- Server Components
- Client Components
- lazy loading
- code splitting

То есть performance изучается **на реальной проблеме**, а не на искусственном:

```text
Counter component
↓
add React.memo
↓
"we learned memoization"
```

---

# Testing

Я бы тоже не делал `Testing Lab`.

Тесты должны появляться рядом с нормальным кодом:

```text
projects/
  components/
  hooks/
  api/
  queries/
  mutations/
  utils/
  ...
```

И там:

- unit tests
- component tests
- integration tests
- E2E

Например:

```text
create project
edit project
filter projects
receive notification
send message
reconnect WebSocket
```

То есть тестируем реальные сценарии.

---

# Backend

Я бы не вводил отдельный backend-сервис сразу.

На первом этапе:

```text
Next.js
├── App Router
├── Server Components
├── Route Handlers
├── Server Actions
└── PostgreSQL
```

Этого более чем достаточно.

И мы сможем на практике сравнить:

```text
Server Component
        ↓
direct database access
```

против

```text
Client Component
        ↓
TanStack Query
        ↓
API
        ↓
PostgreSQL
```

А также:

```text
Server Action
```

и

```text
Route Handler
```

Это как раз очень полезно для понимания Next.js.

---

# Дополнительные технологии

Я бы **не пытался запихнуть WebRTC, Three.js, Turborepo и CMS в основной проект**.

Это нарушит нашу основную идею.

Лучше:

```text
main playground
│
├── core application
│
├── realtime
│
├── performance
│
└── optional experiments
    ├── WebRTC / LiveKit
    ├── Three.js / R3F
    ├── CMS
    ├── GraphQL / Hasura
    └── monorepo
```

Например:

### WebRTC / LiveKit

Отдельный маленький `/video` experiment:

```text
Join room
Camera
Microphone
Participants
Leave room
```

И на этом остановиться.

Изучаем:

```text
WebRTC
↓
media connection
↓
room
↓
SFU
↓
LiveKit SDK
```

Без попытки строить Zoom.

### Three.js / R3F

Отдельная страница может иметь действительно естественный use case, например:

```text
Project / workspace visualization
```

или просто отдельный mini-project, если подходящего use case не найдется.

### CMS

Не делать CMS частью ядра.

Позже можно добавить:

```text
/content
```

и попробовать:

- Sanity
- Strapi
- Contentful

на небольшом контентном разделе.

---

# Monorepo

Тоже не начинал бы с Turborepo.

Сначала обычный:

```text
project/
  app/
```

А когда появится реальная причина иметь несколько приложений:

```text
apps/
  web/
  admin/

packages/
  ui/
  database/
  config/
```

тогда Turborepo становится не "технологией ради технологии", а решением конкретной архитектурной проблемы.

---

# Итого

Я бы сейчас зафиксировал концепцию так:

> **Production-like Full-Stack Playground**
>
> Один реалистичный Next.js application без бизнес-ценности и без попытки стать настоящим продуктом.
>
> Его задача - дать возможность безопасно и последовательно практиковать современные frontend/full-stack технологии на
> реалистичных задачах, сохраняя production-like структуру, naming, data flow и архитектурные решения.

И ключевой принцип:

**Не "изучаем React Query".**

А:

> "Нам нужно получать и кэшировать список проектов, фильтровать его, обновлять данные после mutation и синхронизировать
> изменения - какой подход здесь использовать?"

И уже в процессе мы изучаем TanStack Query, caching, optimistic updates, invalidation и т.д.

Это, на мой взгляд, гораздо ближе к тому, **как эти технологии реально встречаются на работе и на собеседовании**.
