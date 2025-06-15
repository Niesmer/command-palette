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

  const confirm = () => {
    setSearch(`/${command.label}`);
    setSuggestion("");
    setPressed(false);
  }

  return (
    <button
      onFocus={(e) => setSuggestion(search + command.label.slice(search.length-1))}

      onClick={() => confirm()}

      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          setPressed(true);
        } 
        if (e.key === "Tab") {
          e.preventDefault();
          confirm();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" && pressed) {
          confirm();
        };
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
