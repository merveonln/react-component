import React from 'react';

function List({ todos, handleToggleAllChange, handleTodoChange, handleDeleteTodo, handleClearCompleted, activeFilter, handleFilterChange }) {
  return (
    <section className="main">
      <input  /*Tüm Todo Öğelerinin Durumunu Değiştirme işlemi*/
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={todos.length > 0 && todos.every(todo => todo.done)}
        onChange={handleToggleAllChange}
      />
      <label htmlFor="toggle-all">
      </label>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.done ? 'completed' : ''}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={todo.done}
                onChange={() => handleTodoChange(index)}
              />
              <label>{todo.text}</label>
              <button className="destroy" onClick={() => handleDeleteTodo(index)}></button>
            </div>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <span className="todo-count">
          {todos.filter(todo => !todo.done).length} öğe kaldı
        </span>

        <ul className="filters">
          <li>
            <a 
              className={activeFilter === 'all' ? 'selected' : ''}
              onClick={() => handleFilterChange('all')}
            >All</a>
          </li>
          <li>
            <a 
              className={activeFilter === 'active' ? 'selected' : ''}
              onClick={() => handleFilterChange('active')}
            >Aktif</a>
          </li>
          <li>
            <a 
              className={activeFilter === 'completed' ? 'selected' : ''}
              onClick={() => handleFilterChange('completed')}
            >Tamamlanmış</a>
          </li>
        </ul>

        <button
          hidden={todos.filter(todo => todo.done).length === 0}
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Tamamlananları Temizle
        </button>
      </footer>
    </section>
  );
}

export default List;
