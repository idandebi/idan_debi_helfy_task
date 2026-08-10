import './TaskFilter.css';

function TaskFilter({ current, onChange }) {
  const options = ['all', 'completed', 'pending'];

  return (
    <div className="task-filter">
      {options.map((option) => (
        <button
          key={option}
          className={`filter-btn ${current === option ? 'active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
