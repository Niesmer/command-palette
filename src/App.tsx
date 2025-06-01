import { useState } from "react";
import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState("");

  return (
    <div>
      <input
        id="greet-input"
        onChange={(e) => { setSearchResult(e.currentTarget.value) }}
        placeholder="Enter anything ..."
      />
      <p>{searchResult}</p>
    </div>
  );
}

export default App;
