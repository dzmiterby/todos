import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class TasksFilter extends React.Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={(event) => this.props.todoFilter('all', event)}>
            All
          </button>
        </li>
        <li>
          <button onClick={(event) => this.props.todoFilter(true, event)}>Active</button>
        </li>
        <li>
          <button onClick={(event) => this.props.todoFilter(false, event)}>Completed</button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  todoFilter: () => null,
};
TasksFilter.propTypes = {
  todoFilter: PropTypes.func,
};

export default TasksFilter;
