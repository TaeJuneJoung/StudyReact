import { useState } from "react";
import TodoList from "./components/TodoList";
import { todoProps } from "./models/todo";

const initialTodos: todoProps[] = [];
// let nextId = 0;

function App() {
  const [todos, setTodos] = useState(initialTodos);
  // const handleAdd = (text: string) => {
  //   setTodos([
  //     ...todos,
  //     {
  //       id: nextId++,
  //       text: text,
  //       done: false,
  //     },
  //   ]);
  // };
  const handleChange = (todo: todoProps) => {
    setTodos(
      todos.map((prevTodo) => {
        if (prevTodo.id === todo.id) {
          return todo;
        } else {
          return prevTodo;
        }
      })
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <TodoList
        todos={todos}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
