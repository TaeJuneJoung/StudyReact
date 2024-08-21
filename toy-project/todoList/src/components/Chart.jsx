import { Rnd } from "react-rnd";

import style from "./Chart.module.css";

const Chart = ({ todos, updateTodoPosition }) => {
  return (
    <div className={style["chart-container"]}>
      {todos.map((todo, index) => (
        <Rnd
          key={index}
          default={{
            x: todo.x,
            y: todo.y,
            width: 100,
            height: 50,
          }}
          onDragStop={(e, d) => {
            updateTodoPosition(index, d.x, d.y);
          }}
        >
          <div className={style["todo-item"]}>{index + 1}</div>
        </Rnd>
      ))}
    </div>
  );
};

export default Chart;
