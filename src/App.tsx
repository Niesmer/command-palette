import { useEffect, useState } from "react";
import CommandList from "./components/CommandList";
import { useSearchStore } from "./store";
import useArrows from "./useArrows";

function App() {
  const searchValue = useSearchStore((s) => s.search);
  const setSearchValue = useSearchStore((s) => s.setSearch);
  const suggestionValue = useSearchStore((s) => s.suggestion);
  const ref = useArrows();

  useEffect(() => console.log(searchValue), [searchValue]);

  return (
    <div className="bg-black/80 backdrop-blur-2xl flex items-center justify-center w-screen h-screen">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="bg-white w-1/3 grid grid-rows-[1fr_auto] overflow-hidden rounded-2xl"
      >
        <input
          className="row-start-1 focus:outline-0 p-2 text-gray-400 col-start-1"
          tabIndex={-1}
          disabled
          type="text"
          value={suggestionValue}
        />
        <input
          autoFocus
          name="search"
          value={searchValue}
          className="focus:outline-0 p-2 row-start-1 col-start-1"
          onChange={(e) => {
            setSearchValue(e.currentTarget.value);
          }}
          placeholder="Enter anything ..."
        />

        {searchValue.startsWith("/") ? (
          <div>
            <CommandList search={searchValue.slice(1)} />
          </div>
        ) : searchValue ? (
          <div></div>
        ) : searchValue ? (
          <div></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
