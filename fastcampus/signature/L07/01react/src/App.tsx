import List from "./components/List";
import Alert from "./Alert";
import Form from "./Form";
import Propagation from "./Propagation";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <List></List>
      <Alert onAlert={() => alert("world")} />
      <Form />
      <Propagation />

      <Counter />
    </>
  );
}

export default App;
