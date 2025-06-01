import { useState } from "react";

function App() {
  const [searchResult, setSearchResult] = useState("");

  return (
    <div className="bg-black/80 backdrop-blur-2xl flex items-center justify-center w-screen h-screen">
      <div className="bg-white">
        <input
          className=""
          id="greet-input"
          onChange={(e) => { setSearchResult(e.currentTarget.value) }}
          placeholder="Enter anything ..."
        />
        <p>{searchResult}</p>
      </div>

    </div>
  );
}

export default App;
