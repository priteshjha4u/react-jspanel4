import React, { Component } from 'react';
import ls from '../../services/lshelper';
import TodoListItem from './TodoListItem';
import TodoForm from './TodoForm';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadTodos = this.loadTodos.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos() {
    this.setState({ data: ls.getTodos() });
  }

  handleFormSubmit(d) {
    let r = ls.saveTodo(d);
    if (r.saved) {
      this.loadTodos();
    } else {
      console.error('Error: ' + r.err.message);
    }
  }

  updateTodo(id, du, name = '') {
    let x = false,
      d = this.state.data;
    d.forEach((val, index) => {
      val.id === id && (x = index);
      val.id === id && du && (!name ? (val.done = 'true') : (val.text = name));
    });
    du && (this.setState({ data: d }), ls.saveTodo(d, true)); // eslint-disable-line no-unused-expressions
    x >= 0 && !du && d.splice(x, 1) && (this.setState({ data: d }), ls.saveTodo(d, true)); // eslint-disable-line no-unused-expressions
  }

  render() {
    if (!ls.localStorageExists) {
      return <div className="alert alert-danger">Your browser do not support Local Storage. Please use any modern browser.</div>;
    }
    const todoList = this.state.data.map((t, i) => {
      return <TodoListItem data={t} clickHandler={this.updateTodo} key={t.id} hash={i + 1} />;
    });
    const noItems = !this.state.data.length ? <div className="alert alert-danger">Your task list is empty.</div> : null;
    const taskDone = (() => {
      let d = this.state.data.filter(o => o.done === 'true');
      return (
        <span className="btn btn-success float-right">
          {'Done '}
          <span className="badge badge-light">{d.length}</span>
        </span>
      );
    })();
    return (
      <div className="card">
        {this.state.data.length ? (
          <div className="card-header">
            <h5 className="card-title">
              <span className="btn btn-info">
                {'Total '}
                <span className="badge badge-light"> {this.state.data.length}</span>
              </span>
              {taskDone}
            </h5>
          </div>
        ) : null}
        <div className="card-body">
          {noItems}
          <ul className="list-group">{todoList}</ul>
        </div>
        <div className="card-footer">
          <TodoForm formsubmit={this.handleFormSubmit} />
        </div>
      </div>
    );
  }
}

export default TodoApp;
