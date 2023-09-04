import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  render() {
    let dis = false;
    for (let elem of this.props.todo) {
      if (elem.timerStatus === true) {
        dis = true;
        break;
      }
    }
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={(event) => this.props.saveTodo(event)}
          disabled={dis}
        />
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  todo: [],
  saveTodo: () => null,
  clearCompleted: () => null,
};
NewTaskForm.propTypes = {
  todo: PropTypes.array,
  saveTodo: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default NewTaskForm;
