import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      todos: [],
    };
  }
  componentDidMount() {
    fetch("/todos")
      .then((res) => res.json())
      .then((newTodos) => {
        this.setState((state) => {
          return { todos: newTodos };
        });
      })
      .catch((err) => console.log(err));
  }

  handleOnChange = (event) => {
    const a = event.target.value;
    this.setState(() => {
      return { value: a };
    });
  };

  deleteTodo = (id) => (event) => {
    console.log(id);
    fetch(`/todos/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      });
  };
  handleClick = (event) => {
    event.preventDefault();
    fetch("/todos", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: this.state.value }),
    })
      .then((res) => res.json())
      .then((todo) => {
        this.setState((state) => ({
          todos: [...state.todos, todo],
          value: "",
        }));
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>To do List</h1>
        <form onSubmit={this.handleClick}>
          <label>Enter a To Do</label>
          <input onChange={this.handleOnChange} value={this.state.value} />
          <button type="submit">Add</button>
        </form>

        <ul>
          {this.state.todos.map((todo) => (
            <li>
              {todo.todo}
              <button onClick={this.deleteTodo(todo.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
