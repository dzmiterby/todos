/* eslint import/order: ["error", {"newlines-between": "always-and-inside-groups"}] */
import React from 'react';
import './App.css';

import { v4 as uuid } from 'uuid';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: [],
      filterStatus: 'all',
      filterTodo: [],
      timerId: 0,
    };
  }

  // Добавление задачи
  saveTodo = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      let uid = uuid();
      this.setState({
        todo: [
          ...this.state.todo,
          {
            id: uid,
            title: event.target.value.trim(),
            status: true,
            date: new Date(),
            seconds: 0,
            timerStatus: false,
            play: 'icon icon-play',
            pause: 'icon icon-pause none',
          },
        ],
        filterTodo: [
          ...this.state.todo,
          {
            id: uid,
            title: event.target.value.trim(),
            status: true,
            date: new Date(),
            seconds: 0,
            timerStatus: false,
            play: 'icon icon-play',
            pause: 'icon icon-pause none',
          },
        ],
      });
      if (this.state.filterStatus !== 'all') {
        let newFilterTodo = [
          ...this.state.todo,
          {
            id: uid,
            title: event.target.value.trim(),
            status: true,
            date: new Date(),
            seconds: 0,
            timerStatus: false,
            play: 'icon icon-play',
            pause: 'icon icon-pause none',
          },
        ].filter((item) => item.status === this.state.filterStatus);
        this.setState({
          filterTodo: newFilterTodo,
        });
      }
      event.target.value = '';
    }
  };

  // Фильтры
  todoFilter = (status, event) => {
    for (let elem of this.state.todo) {
      if (elem.timerStatus === true) {
        return null;
      }
    }
    document.querySelectorAll('.filters button').forEach((elem) => {
      elem.classList.remove('selected');
    });
    if (status === 'all') {
      this.setState({
        filterTodo: this.state.todo,
        filterStatus: status,
      });
      event.target.classList.add('selected');
    } else {
      let newTodo = this.state.todo.filter((item) => item.status === status);
      this.setState({
        filterTodo: newTodo,
        filterStatus: status,
      });
      event.target.classList.add('selected');
    }
  };

  // Удаление выполненных задач
  clearCompleted = () => {
    for (let elem of this.state.todo) {
      if (elem.timerStatus === true) {
        return null;
      }
    }
    let newTodo = this.state.todo.filter((item) => item.status === true);
    this.setState({
      todo: newTodo,
      filterTodo: newTodo,
    });
    if (this.state.filterStatus !== 'all') {
      let newFilterTodo = newTodo.filter((item) => item.status === this.state.filterStatus);
      this.setState({
        filterTodo: newFilterTodo,
      });
    }
  };

  // Изменение статуса задачи active/completed
  statusTodo = (id, event) => {
    if (event.target.checked) {
      let newTodo = this.state.todo.filter((item) => {
        if (item.id === id) {
          item.status = !item.status;
        }
        return item;
      });
      this.setState({
        todo: newTodo,
        filterTodo: newTodo,
      });
      if (this.state.filterStatus !== 'all') {
        let newFilterTodo = this.state.todo.filter((item) => item.status === this.state.filterStatus);
        this.setState({
          filterTodo: newFilterTodo,
        });
      }
      event.target.parentNode.parentNode.classList.add('completed');
    } else {
      let newTodo = this.state.todo.filter((item) => {
        if (item.id === id) {
          item.status = !item.status;
        }
        return item;
      });
      this.setState({
        todo: newTodo,
        filterTodo: newTodo,
      });
      if (this.state.filterStatus !== 'all') {
        let newFilterTodo = this.state.todo.filter((item) => item.status === this.state.filterStatus);
        this.setState({
          filterTodo: newFilterTodo,
        });
      }
      event.target.parentNode.parentNode.classList.remove('completed');
    }
  };

  // Редактирование задачи
  editTodo = (event) => {
    for (let elem of this.state.todo) {
      if (elem.timerStatus === true) {
        return null;
      }
    }
    if (!event.target.parentNode.children[0].checked) {
      event.target.parentNode.parentNode.classList.add('editing');
    }
  };

  changeTodo = (id, event) => {
    if (event.key === 'Enter') {
      let newTodo = this.state.todo.map((item) => {
        if (item.id === id) {
          item.title = event.target.value;
        }
        return item;
      });
      this.setState({
        todo: newTodo,
        filterTodo: newTodo,
      });
      event.target.parentNode.classList.remove('editing');
    }
  };

  // Удаление задачи
  deleteTodo = (id) => {
    for (let elem of this.state.todo) {
      if (elem.timerStatus === true) {
        return null;
      }
    }
    let newTodo = this.state.todo.filter((item) => item.id !== id);
    this.setState({
      todo: newTodo,
      filterTodo: newTodo,
    });
    if (this.state.filterStatus !== 'all') {
      let newFilterTodo = newTodo.filter((item) => item.status === this.state.filterStatus);
      this.setState({
        filterTodo: newFilterTodo,
      });
    }
  };

  // Запуск таймера
  start = (id) => {
    for (let elem of this.state.todo) {
      if (elem.timerStatus === true) {
        return null;
      }
    }
    let newTodo = this.state.todo.map((item) => {
      if (item.id === id) {
        item.timerStatus = true;
        item.play = 'icon icon-play none';
        item.pause = 'icon icon-pause';
      }
      return item;
    });
    this.setState({
      todo: newTodo,
      filterTodo: newTodo,
    });
    let ident = setInterval(() => {
      let newTodo = this.state.todo.map((item) => {
        if (item.id === id) {
          item.seconds = item.seconds + 1;
          item.play = 'icon icon-play none';
          item.pause = 'icon icon-pause';
        }
        return item;
      });
      this.setState({
        todo: newTodo,
        filterTodo: newTodo,
      });
    }, 1000);
    this.setState({
      timerId: ident,
    });
  };

  // Остановка таймера
  stop = (id) => {
    let newTodo = this.state.todo.map((item) => {
      if (item.id === id) {
        item.timerStatus = false;
        item.play = 'icon icon-play';
        item.pause = 'icon icon-pause none';
      }
      return item;
    });
    this.setState({
      todo: newTodo,
      filterTodo: newTodo,
    });
    clearInterval(this.state.timerId);
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm saveTodo={this.saveTodo} clearCompleted={this.clearCompleted} todo={this.state.todo} />
        <section className="main">
          <TaskList
            filterTodo={this.state.filterTodo}
            statusTodo={this.statusTodo}
            editTodo={this.editTodo}
            deleteTodo={this.deleteTodo}
            changeTodo={this.changeTodo}
            start={this.start}
            stop={this.stop}
            todo={this.state.todo}
            changeStates={this.changeStates}
          />
          <Footer todo={this.state.todo} todoFilter={this.todoFilter} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    );
  }
}

export default App;
