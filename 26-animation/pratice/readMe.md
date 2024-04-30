# Framer Animation

```js
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div id="demo">
      <motion.div
        id="box"
        animate={{ x, y, rotate }}
        transition={{
          duration: 2,
          type: "spring",
          // bounce: 1,
        }}
      />

      <div id="inputs">
        <p>
          <label htmlFor="x">X</label>
          <input
            type="number"
            id="x"
            onChange={(event) => setX(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="y">Y</label>
          <input
            type="number"
            id="y"
            onChange={(event) => setY(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="rotate">Rotate</label>
          <input
            type="number"
            id="rotate"
            onChange={(event) => setRotate(+event.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default App;
```

- animate: 적용될 애니메이션 요소
- transition: 이동 옵션
  - duration: 옵션 동작 시간(초)
  - type: 이동 타입
  - bounce: 바운스 정도
