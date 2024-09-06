export interface todoProps {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoListProps {
  todos: todoProps[];
  handleChange: (todo: todoProps) => void;
  handleDelete: (id: number) => void;
}

export interface TodoProps {
  index: number;
  todo: todoProps;
  handleChange: (todo: todoProps) => void;
  handleDelete: (id: number) => void;
}

// export interface addTodoProps {
//   handleAdd: (text: string) => void;
// }
