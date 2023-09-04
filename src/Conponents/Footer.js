import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.todo.filter((item) => item.status === true).length} items left</span>
        <TasksFilter todoFilter={this.props.todoFilter} />
        <button className="clear-completed" onClick={this.props.clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  todo: [],
  todoFilter: () => null,
  clearCompleted: () => null,
};
Footer.propTypes = {
  todo: PropTypes.array,
  todoFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
