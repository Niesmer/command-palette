import { generate_commands_from_string } from '../assets/commands';
import Command from './Command';

type CommandListProps = {
    search: string;
}

const CommandList = ({ search }: CommandListProps) => {
    return (
        <div>
            <ul>
                {generate_commands_from_string(search).map((command, index) =>
                    <li key={index} className='focus-within:bg-red-200 has-active:bg-green-200 px-2 py-1'>
                        <Command command={command} />
                    </li>
                )}
            </ul>
        </div>

    );
};

export default CommandList;