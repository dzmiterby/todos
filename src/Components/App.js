import React, { useEffect, useState } from 'react';

import './App.css';
import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

function App() {
  const [todo, setTodo] = useState([]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTodo, setFilterTodo] = useState(todo);

  useEffect(() => {
    if (filterStatus === 'all') setFilterTodo(todo);
  }, [filterStatus, todo]);

  return (
    <section className="todoapp">
      <NewTaskForm todo={todo} setTodo={setTodo} filterStatus={filterStatus} setFilterTodo={setFilterTodo} />
      <section className="main">
        <TaskList
          filterTodo={filterTodo}
          setFilterTodo={setFilterTodo}
          todo={todo}
          setTodo={setTodo}
          filterStatus={filterStatus}
        />
        <Footer
          todo={todo}
          setTodo={setTodo}
          setFilterTodo={setFilterTodo}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </section>
    </section>
  );
}

export default App;
