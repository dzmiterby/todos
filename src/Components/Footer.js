import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

function Footer({ todo, setTodo, setFilterTodo, filterStatus, setFilterStatus }) {
  let activeTask = todo.filter((item) => item.status === true);

  function clearCompleted() {
    let newTodo = todo.filter((item) => item.status === true);
    setTodo(newTodo);
    if (filterStatus !== 'all') {
      let newFilterTodo = newTodo.filter((item) => item.status === filterStatus);
      setFilterTodo(newFilterTodo);
    }
  }

  return (
    <footer className="footer">
      <span className="todo-count">{activeTask.length} items left</span>
      <TasksFilter todo={todo} setFilterTodo={setFilterTodo} setFilterStatus={setFilterStatus} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filterStatus: 'all',
  todo: [],
};
Footer.propTypes = {
  todo: PropTypes.array,
};

export default Footer;
