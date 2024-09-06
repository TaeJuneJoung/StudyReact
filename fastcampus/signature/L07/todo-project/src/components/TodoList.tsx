import type { TodoListProps } from "../models/todo";
import Todo from "./Todo";

function TodoList({ todos, handleChange, handleDelete }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          <Todo
            index={index}
            todo={todo}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
