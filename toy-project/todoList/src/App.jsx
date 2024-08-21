import { useEffect, useState } from "react";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Chart from "./components/Chart";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }

    const now = new Date();
    const lastSavedDate = localStorage.getItem("lastSavedDate");
    if (lastSavedDate && new Date(lastSavedDate).getDate() !== now.getDate()) {
      localStorage.removeItem("todos");
      localStorage.setItem("lastSavedDate", now);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("lastSavedDate", new Date());
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { text, x: 0, y: 0 }]);
  };

  const updateTodoPosition = (index, x, y) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, x, y } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} />
      <Chart todos={todos} updateTodoPosition={updateTodoPosition} />
    </div>
  );
}

export default App;
