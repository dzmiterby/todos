import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import Task from './Task';

class TaskList extends React.Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.filterTodo.map((item) => (
          <Task
            key={item.id}
            id={item.id}
            title={item.title}
            status={item.status}
            date={item.date}
            seconds={item.seconds}
            play={item.play}
            pause={item.pause}
            statusTodo={this.props.statusTodo}
            editTodo={this.props.editTodo}
            deleteTodo={this.props.deleteTodo}
            changeTodo={this.props.changeTodo}
            start={this.props.start}
            stop={this.props.stop}
            todo={this.props.todo}
          />
        ))}
      </ul>
    );
  }
}

TaskList.defaultProps = {
  todo: [],
  filterTodo: [],
  statusTodo: () => null,
  editTodo: () => null,
  deleteTodo: () => null,
  changeTodo: () => null,
  start: () => null,
  stop: () => null,
};
TaskList.propTypes = {
  todo: PropTypes.array,
  filterTodo: PropTypes.array,
  statusTodo: PropTypes.func,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  changeTodo: PropTypes.func,
  start: PropTypes.func,
  stop: PropTypes.func,
};

export default TaskList;
