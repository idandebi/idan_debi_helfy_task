import './TaskItem.css';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  function handleDelete() {
    if (window.confirm('Delete this task?')) {
      onDelete(task.id);
    }
  }

  const dateText = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className={`priority-badge priority-${task.priority}`}>
        {task.priority}
      </div>

      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <span className="task-date">Created: {dateText}</span>

      <div className="task-actions">
        <button className="action-btn toggle-btn" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Pending' : 'Mark Done'}
        </button>
        <button className="action-btn edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="action-btn delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
