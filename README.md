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

