import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

function TasksFilter({ todo, setFilterTodo, setFilterStatus }) {
  function todoFilter(status, event) {
    document.querySelectorAll('.filters button').forEach((elem) => {
      elem.classList.remove('selected');
    });
    if (status === 'all') {
      setFilterTodo(todo);
      setFilterStatus(status);
      event.target.classList.add('selected');
    } else {
      let newTodo = todo.filter((item) => item.status === status);
      setFilterTodo(newTodo);
      setFilterStatus(status);
      event.target.classList.add('selected');
    }
  }

  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={(event) => todoFilter('all', event)}>
          All
        </button>
      </li>
      <li>
        <button onClick={(event) => todoFilter(true, event)}>Active</button>
      </li>
      <li>
        <button onClick={(event) => todoFilter(false, event)}>Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  todo: [],
};
TasksFilter.propTypes = {
  todo: PropTypes.array,
};

export default TasksFilter;
