import { useState } from 'react';
import './TaskForm.css';

function TaskForm({ initialTask, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [description, setDescription] = useState(initialTask ? initialTask.description : '');
  const [priority, setPriority] = useState(initialTask ? initialTask.priority : 'medium');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setError('');
    onSubmit({ title, description, priority });

    if (!initialTask) {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialTask ? 'Edit Task' : 'Add New Task'}</h3>

      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialTask ? 'Save Changes' : 'Add Task'}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
