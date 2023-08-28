import React from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

function NewTaskForm({ todo, setTodo, filterStatus, setFilterTodo }) {
  function saveTodo(event) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTodo([
        ...todo,
        {
          id: uuid(),
          title: event.target.value,
          status: true,
          date: new Date(),
          seconds: 0,
          timerStatus: false,
          play: 'icon icon-play',
          pause: 'icon icon-pause none',
        },
      ]);
      if (setFilterTodo !== 'all') {
        let newFilterTodo = [
          ...todo,
          {
            id: uuid(),
            title: event.target.value,
            status: true,
            date: new Date(),
            seconds: 0,
            timerStatus: false,
            play: 'icon icon-play',
            pause: 'icon icon-pause none',
          },
        ].filter((item) => item.status === filterStatus);
        setFilterTodo(newFilterTodo);
      }
      event.target.value = '';
    }
  }

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" onKeyDown={saveTodo} />
      </header>
    </>
  );
}

NewTaskForm.defaultProps = {
  filterStatus: 'all',
  todo: [],
};
NewTaskForm.propTypes = {
  todo: PropTypes.array,
};

export default NewTaskForm;
