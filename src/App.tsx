import { useEffect, useState } from "react";
import CommandList from "./components/CommandList";
import useArrows from "react-use-arrows";
import { useSearchStore } from "./store";

function App() {
  const searchValue = useSearchStore((s) => s.search);
  const setSearchValue = useSearchStore((s) => s.setSearch);
  const ref = useArrows();

  useEffect(() => (console.log(searchValue)), [searchValue])

  return (
    <div className="bg-black/80 backdrop-blur-2xl flex items-center justify-center w-screen h-screen">
      <div ref={ref} className="bg-white w-1/3 overflow-hidden rounded-2xl">
        <input
          value={searchValue}
          className="w-full focus:outline-0 p-2"
          onChange={(e) => { setSearchValue(e.currentTarget.value) }}
          placeholder="Enter anything ..."
        />
        {searchValue.startsWith("/") ?
          <div>
            <CommandList search={searchValue.slice(1)} />
          </div> : searchValue ?
            <div>

            </div> : searchValue ?
              <div>

              </div> : <div>

              </div>}
      </div>
    </div>
  );
}

export default App;
