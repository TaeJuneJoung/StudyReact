import { useRef } from "react";

const TodoInput = ({ addTodo }) => {
  const inputData = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputData.current.value);
    if (inputData.current.value.trim()) {
      addTodo(inputData.current.value);
      inputData.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputData} placeholder="Add Todo" />
      <button type="submit">ADD</button>
    </form>
  );
};

export default TodoInput;
