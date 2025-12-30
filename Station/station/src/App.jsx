import "./App.css";
import { Counter } from "./Counter";
import { FocusableInput } from "./FocusableInput";
import { SearchableList } from "./SearchableList";
import { StopWatch } from "./StopWatch";

const list = [
  { id: "1", title: "Арбуз" },
  { id: "13", title: "Огурец" },
  { id: "3", title: "Свекла" },
];

function App() {
  return (
    <>
      <SearchableList list={list} /> <Counter /> <FocusableInput /> <StopWatch />
    </>
  );
}

export default App;
