import React from "react";
import { type Command } from "../assets/commands";
import { useSearchStore } from "../store";

type CommandProps = {
  command: Command;
};

const Command = ({ command }: CommandProps) => {
  const [pressed, setPressed] = React.useState(false);
  const search = useSearchStore((s) => s.search);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setSuggestion = useSearchStore((s) => s.setSuggestion);

  return (
    <button
      onFocus={(e) => setSuggestion(search + command.label.slice(search.length-1))}
      onClick={() => {
        setSearch(`/${command.label}`);
        setSuggestion("");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") setPressed(true);
        if (e.key === "Tab") {
          e.preventDefault();
          setSearch(`/${command.label}`);
          setSuggestion("");
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") setPressed(false);
      }}
      onBlur={() => {
        setSuggestion("");
        setPressed(false);
      }}
      type="button"
      className={`w-full outline-0 text-left ${pressed ? "active" : ""}`}
    >
      /{command.label}
    </button>
  );
};

export default Command;
