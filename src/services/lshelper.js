import uuid from 'uuid/v4';

const lsPrefix = 'todoAppStorage';

const localStorageExists = (() => typeof localStorage === 'object')();

const getTodos = () => {
  let todos = [];
  try {
    todos = JSON.parse(localStorage.getItem(lsPrefix));
    return todos || [];
  } catch (e) {
    return todos;
  }
};

const saveTodo = (data, update = false) => {
  try {
    let todos = getTodos();
    let newTodo = update
      ? null
      : {
          id: uuid(),
          text: data.tname,
          done: 'false'
        };
    !update && todos.push(newTodo);
    localStorage.setItem(lsPrefix, update ? JSON.stringify(data) : JSON.stringify(todos));
    return { saved: true };
  } catch (e) {
    return { saved: false, err: e };
  }
};

export default { localStorageExists, getTodos, saveTodo };
