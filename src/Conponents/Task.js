import React from 'react';
import './App.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

class Task extends React.Component {
  render() {
    let dis = false;
    for (let elem of this.props.todo) {
      if (elem.timerStatus === true) {
        dis = true;
        break;
      }
    }
    return (
      <>
        {this.props.status ? (
          <li>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={(event) => this.props.statusTodo(this.props.id, event)}
                disabled={dis}
              />
              <label>
                <span className="title">{this.props.title}</span>
                <span className="description">
                  <button className={this.props.play} onClick={() => this.props.start(this.props.id)}></button>
                  <button className={this.props.pause} onClick={() => this.props.stop(this.props.id)}></button>
                  <span>
                    {String(Math.floor(this.props.seconds / 60)).padStart(2, '0')}:
                    {String(this.props.seconds % 60).padStart(2, '0')}
                  </span>
                </span>
                <span className="description">
                  created{' '}
                  {formatDistanceToNow(this.props.date, new Date(), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}{' '}
                  ago
                </span>
              </label>
              <button className="icon icon-edit" onClick={this.props.editTodo}></button>
              <button className="icon icon-destroy" onClick={() => this.props.deleteTodo(this.props.id)}></button>
            </div>
            <input
              type="text"
              className="edit"
              defaultValue={this.props.title}
              onKeyDown={(event) => this.props.changeTodo(this.props.id, event)}
            />
          </li>
        ) : (
          <li className="completed">
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={(event) => this.props.statusTodo(this.props.id, event)}
                defaultChecked
                disabled={dis}
              />
              <label>
                <span className="title">{this.props.title}</span>
                <span className="description">
                  <button className={this.props.play} onClick={() => null}></button>
                  <button className={this.props.pause} onClick={() => null}></button>
                  <span>
                    {String(Math.floor(this.props.seconds / 60)).padStart(2, '0')}:
                    {String(this.props.seconds % 60).padStart(2, '0')}
                  </span>
                </span>
                <span className="description">
                  created{' '}
                  {formatDistanceToNow(this.props.date, new Date(), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}{' '}
                  ago
                </span>
              </label>
              <button className="icon icon-edit" onClick={this.props.editTodo}></button>
              <button className="icon icon-destroy" onClick={() => this.props.deleteTodo(this.props.id)}></button>
            </div>
            <input
              type="text"
              className="edit"
              defaultValue={this.props.title}
              onKeyDown={(event) => this.props.changeTodo(this.props.id, event)}
            />
          </li>
        )}
      </>
    );
  }
}

Task.defaultProps = {
  todo: [],
  id: '',
  title: '',
  status: true,
  date: new Date(),
  seconds: 0,
  play: 'icon icon-play',
  pause: 'icon icon-pause none',
  statusTodo: () => null,
  editTodo: () => null,
  deleteTodo: () => null,
  changeTodo: () => null,
  start: () => null,
  stop: () => null,
};
Task.propTypes = {
  todo: PropTypes.array,
  id: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.bool,
  date: PropTypes.object,
  seconds: PropTypes.number,
  play: PropTypes.string,
  pause: PropTypes.string,
  statusTodo: PropTypes.func,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  changeTodo: PropTypes.func,
  start: PropTypes.func,
  stop: PropTypes.func,
};

export default Task;
