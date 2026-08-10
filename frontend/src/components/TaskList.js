import { useState, useEffect, useRef, useCallback } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const AUTOPLAY_MS = 4000;
const TRANSITION_MS = 400;

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const intervalRef = useRef(null);

  const hasTasks = tasks.length > 0;
  const canLoop = tasks.length > 1;
  const slides = hasTasks ? [tasks[tasks.length - 1], ...tasks, tasks[0]] : [];
  const idsKey = tasks.map((t) => t.id).join(',');

  useEffect(() => {
    setIndex(1);
    setWithTransition(false);
  }, [idsKey]);

  const goNext = useCallback(() => {
    setWithTransition(true);
    setIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    setWithTransition(true);
    setIndex((i) => i - 1);
  }, []);

  useEffect(() => {
    if (!canLoop) return undefined;
    intervalRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(intervalRef.current);
  }, [canLoop, idsKey, goNext]);

  function pause() {
    clearInterval(intervalRef.current);
  }

  function resume() {
    if (!canLoop) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, AUTOPLAY_MS);
  }

  function handleArrowClick(direction) {
    pause();
    if (direction === 'next') {
      goNext();
    } else {
      goPrev();
    }
    resume();
  }

  function handleDotClick(i) {
    pause();
    setWithTransition(true);
    setIndex(i + 1);
    resume();
  }

  function handleTransitionEnd() {
    if (index === slides.length - 1) {
      setWithTransition(false);
      setIndex(1);
    } else if (index === 0) {
      setWithTransition(false);
      setIndex(slides.length - 2);
    }
  }

  if (!hasTasks) {
    return <div className="carousel-empty">No tasks yet. Add one above to get started.</div>;
  }

  const activeDot = ((index - 1) % tasks.length + tasks.length) % tasks.length;

  return (
    <div className="carousel" onMouseEnter={pause} onMouseLeave={resume}>
      <button className="carousel-arrow left" onClick={() => handleArrowClick('prev')} aria-label="Previous task">
        &#8249;
      </button>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: withTransition ? `transform ${TRANSITION_MS}ms ease` : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((task, i) => (
            <div className="carousel-slide" key={`${task.id}-${i}`}>
              <TaskItem task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-arrow right" onClick={() => handleArrowClick('next')} aria-label="Next task">
        &#8250;
      </button>

      <div className="carousel-dots">
        {tasks.map((task, i) => (
          <span
            key={task.id}
            className={`dot ${i === activeDot ? 'active' : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
