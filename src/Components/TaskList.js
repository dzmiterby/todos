import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import Task from './Task';

function TaskList({ filterTodo, setFilterTodo, todo, setTodo, filterStatus }) {
  return (
    <ul className="todo-list">
      {filterTodo.map((item) => (
        <Task
          key={item.id}
          todo={todo}
          setTodo={setTodo}
          id={item.id}
          title={item.title}
          status={item.status}
          date={item.date}
          setFilterTodo={setFilterTodo}
          filterStatus={filterStatus}
        />
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  filterStatus: 'all',
  todo: [],
  filterTodo: [],
};
TaskList.propTypes = {
  todo: PropTypes.array,
  filterTodo: PropTypes.array,
};

export default TaskList;
