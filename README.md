# Task Manager App

A simple task manager built with React and Express. Tasks are shown in an
auto-playing, infinite carousel with prev/next controls, and can be created,
edited, completed and deleted through a small REST API backed by in-memory
storage.

## Backend Setup

1. `cd backend`
2. `npm install`
3. `npm start` (runs on port 4000)

## Frontend Setup

1. `cd frontend`
2. `npm install`
3. `npm start` (runs on port 3000)

The frontend expects the backend to already be running on `http://localhost:4000`.

## API Endpoints

| Method | Endpoint                  | Description                  |
| ------ | -------------------------- | ----------------------------- |
| GET    | /api/tasks                | Get all tasks                 |
| POST   | /api/tasks                | Create a new task             |
| PUT    | /api/tasks/:id            | Update a task                 |
| DELETE | /api/tasks/:id            | Delete a task                 |
| PATCH  | /api/tasks/:id/toggle     | Toggle task completion status |

### Task object

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2026-08-10T12:00:00.000Z",
  "priority": "medium"
}
```

`POST /api/tasks` requires `title` and `priority` (`low` | `medium` | `high`).
`description` is optional. Missing/invalid fields return `400` with an
`{ "error": "..." }` body. Requests for a task id that doesn't exist return
`404`.

## Assumptions & Decisions

- No database is used, tasks live in memory on the server and reset on
  restart, as requested in the assignment.
- The carousel shows one task per slide and loops infinitely in both
  directions by cloning the first/last slide, auto-advances every 4 seconds,
  and pauses on hover. Prev/next arrows and dot navigation are also available.
- Delete uses a native `window.confirm` before calling the API.
- Editing a task reuses the same form component as creating one, opened above
  the filter bar with the task's current values pre-filled.
- Styling is plain CSS per component, no UI framework.

## Time Spent

- Backend: ~1.5 hours
- Frontend core features: ~1.5 hours
- Carousel: ~45 minutes
- Styling & polish: ~30 minutes
- Testing & fixes: ~15 minutes
