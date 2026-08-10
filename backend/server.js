const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'Title is required'
        });
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({
            error: 'Priority must be low, medium, or high'
        });
    }

    const newTask = {
        id: nextId,
        title: title,
        description: description || '',
        completed: false,
        createdAt: new Date(),
        priority: priority
    };

    nextId++;

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            error: 'Task not found'
        });
    }

    const { title, description, completed, priority } = req.body;

    if (title !== undefined) {
        if (title.trim() === '') {
            return res.status(400).json({
                error: 'Title is required'
            });
        }
        task.title = title;
    }

    if (description !== undefined) {
        task.description = description;
    }

    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({
                error: 'Completed must be a boolean'
            });
        }
        task.completed = completed;
    }

    if (priority !== undefined) {
        if (!['low', 'medium', 'high'].includes(priority)) {
            return res.status(400).json({
                error: 'Priority must be low, medium, or high'
            });
        }
        task.priority = priority;
    }

    res.json(task);
});

app.patch('/api/tasks/:id/toggle', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            error: 'Task not found'
        });
    }

    task.completed = !task.completed;

    res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: 'Task not found'
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});