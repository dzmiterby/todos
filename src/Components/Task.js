import React, { useEffect } from 'react';
import './App.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

function Task({
  todo,
  setTodo,
  id,
  title,
  status,
  date,
  setFilterTodo,
  filterStatus,
  seconds,
  timerStatus,
  play,
  pause,
}) {
  const minuteString = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondString = String(seconds % 60).padStart(2, '0');

  function statusTodo(id, event) {
    if (event.target.checked) {
      let newTodo = todo.filter((item) => {
        if (item.id === id) {
          item.status = !item.status;
          item.timerStatus = false;
          item.play = 'icon icon-play';
          item.pause = 'icon icon-pause none';
        }
        return item;
      });
      setTodo(newTodo);
      if (filterStatus !== 'all') {
        let newFilterTodo = todo.filter((item) => item.status === filterStatus);
        setFilterTodo(newFilterTodo);
      }
      event.target.parentNode.parentNode.classList.add('completed');
    } else {
      let newTodo = todo.filter((item) => {
        if (item.id === id) {
          item.status = !item.status;
        }
        return item;
      });
      setTodo(newTodo);
      if (filterStatus !== 'all') {
        let newFilterTodo = todo.filter((item) => item.status === filterStatus);
        setFilterTodo(newFilterTodo);
      }
      event.target.parentNode.parentNode.classList.remove('completed');
    }
  }

  function editTodo(event) {
    for (let elem of todo) {
      if (elem.timerStatus === true) {
        return null;
      }
    }
    if (!event.target.parentNode.children[0].checked) {
      event.target.parentNode.parentNode.classList.add('editing');
    }
  }

  function saveTodo(id, event) {
    if (event.key === 'Enter') {
      let newTodo = todo.map((item) => {
        if (item.id === id) {
          item.title = event.target.value;
        }
        return item;
      });
      setTodo(newTodo);
      event.target.parentNode.classList.remove('editing');
    }
  }

  function deleteTodo(id) {
    for (let elem of todo) {
      if (elem.timerStatus === true) {
        return null;
      }
    }
    let newTodo = todo.filter((item) => item.id !== id);
    setTodo(newTodo);
    if (filterStatus !== 'all') {
      let newFilterTodo = newTodo.filter((item) => item.status === filterStatus);
      setFilterTodo(newFilterTodo);
    }
  }

  function start() {
    let newTodo = todo.map((item) => {
      if (item.id === id) {
        item.timerStatus = true;
        item.play = 'icon icon-play none';
        item.pause = 'icon icon-pause';
      }
      return item;
    });
    setTodo(newTodo);
  }

  function stop() {
    let newTodo = todo.map((item) => {
      if (item.id === id) {
        item.timerStatus = false;
        item.play = 'icon icon-play';
        item.pause = 'icon icon-pause none';
      }
      return item;
    });
    setTodo(newTodo);
  }

  useEffect(() => {
    if (timerStatus) {
      const identificator = setInterval(() => {
        let newTodo = todo.map((item) => {
          if (item.id === id) {
            item.seconds = Math.min(seconds++, 3599);
          }
          return item;
        });
        setTodo(newTodo);
      }, 1000);
      return () => {
        clearInterval(identificator);
      };
    }
  }, [timerStatus]);

  return (
    <>
      {status ? (
        <li>
          <div className="view">
            <input className="toggle" type="checkbox" onChange={(event) => statusTodo(id, event)} />
            <label>
              <span className="title">{title}</span>
              <span className="description">
                <button className={play} onClick={start}></button>
                <button className={pause} onClick={stop}></button>
                <span>
                  {minuteString}:{secondString}
                </span>
              </span>
              <span className="description">
                created{' '}
                {formatDistanceToNow(date, new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })}{' '}
                ago
              </span>
            </label>
            <button className="icon icon-edit" onClick={editTodo}></button>
            <button className="icon icon-destroy" onClick={() => deleteTodo(id)}></button>
          </div>
          <input type="text" className="edit" defaultValue={title} onKeyDown={(event) => saveTodo(id, event)} />
        </li>
      ) : (
        <li className="completed">
          <div className="view">
            <input className="toggle" type="checkbox" onChange={(event) => statusTodo(id, event)} defaultChecked />
            <label>
              <span className="title">{title}</span>
              <span className="description">
                <button className={play} onClick={() => null}></button>
                <button className={pause} onClick={() => null}></button>
                <span>
                  {minuteString}:{secondString}
                </span>
              </span>
              <span className="description">
                created{' '}
                {formatDistanceToNow(date, new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })}{' '}
                ago
              </span>
            </label>
            <button className="icon icon-edit" onClick={editTodo}></button>
            <button className="icon icon-destroy" onClick={() => deleteTodo(id)}></button>
          </div>
          <input type="text" className="edit" defaultValue={title} onKeyDown={(event) => saveTodo(id, event)} />
        </li>
      )}
    </>
  );
}

Task.defaultProps = {
  filterStatus: 'all',
  todo: [],
  id: uuid(),
  title: '',
  status: true,
  date: new Date(),
};
Task.propTypes = {
  todo: PropTypes.array,
  id: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.bool,
  date: PropTypes.object,
};

export default Task;
