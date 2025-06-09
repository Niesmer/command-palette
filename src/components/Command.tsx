import React from 'react';
import { type Command } from '../assets/commands';
import { useSearchStore } from '../store';

type CommandProps = {
    command: Command
}

const Command = ({ command }: CommandProps) => {
    const [pressed, setPressed] = React.useState(false);
    const setSearchValue = useSearchStore((s) => s.setSearch);

    return (
        <button
            onFocus={(e) => setSearchValue(`/${command.label}`)}
            onKeyDown={(e) => {
                if (e.key === "Enter") setPressed(true);
                setSearchValue(`/${command.label}`)
            }}
            onKeyUp={(e) => {
                if (e.key === "Enter") setPressed(false);
            }}
            onBlur={() => setPressed(false)}
            type='button'
            className={`w-full outline-0 text-left ${pressed ? 'active' : ''}`}
        >
            /{command.label}
        </button>
    );
};

export default Command;