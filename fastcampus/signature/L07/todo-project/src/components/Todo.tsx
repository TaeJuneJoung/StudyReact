import type { TodoProps } from "../models/todo";

function Todo({ index, todo, handleChange }: TodoProps) {
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(event) => {
          handleChange({
            ...todo,
            done: event.target.checked,
          });
        }}
      />
      {index}. {todo.text}
    </label>
  );
}

export default Todo;
