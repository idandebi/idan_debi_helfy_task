# Task Manager App

## Backend

```
cd backend
npm install
npm start
```

Runs on port 4000.

## Frontend

```
cd frontend
npm install
npm start
```

Runs on port 3000. Backend needs to be running first, frontend calls it directly.

## API

- GET /api/tasks
- POST /api/tasks - title, description, priority
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

Task object:

```
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: 'low' | 'medium' | 'high'
}
```

title and priority are required when creating a task, bad requests return 400.

## Notes

- No database, tasks live in memory and reset when the backend restarts.
- Carousel shows one task at a time, loops forever both ways, autoplays every few seconds and pauses on hover. Arrows and dots also work.
- Delete uses window.confirm, didn't build a custom modal for it.
- Edit reuses the same form as adding a task, just pre-filled with the task's data.
- Plain CSS, no framework.

## Time spent

- Backend: ~1.5h
- Frontend: ~2h
- Styling: ~30 min
- Testing/fixing bugs: ~30 min
