import React from 'react';

function Search({ newTodo, handleNewTodoChange, handleNewTodoSubmit }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleNewTodoSubmit}>
        <input
          className="new-todo"
          placeholder="Ne yapılması gerekiyor?"
          autoFocus
          value={newTodo}
          onChange={handleNewTodoChange}
        />
      </form>
    </header>
  );
}

export default Search;
