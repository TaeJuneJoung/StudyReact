const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {index + 1}. {todo.text}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
