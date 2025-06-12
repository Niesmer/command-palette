import { invoke, InvokeArgs } from "@tauri-apps/api/core"

export function generate_function_from_command(command: Command) {
    return () => invoke(command.command, command.arguments)
}

export function generate_commands_from_string(value: string) {
    return COMMANDS.filter((command)=> (command.label.toLowerCase().match(new RegExp(value.toLowerCase(), "g" )) && command.label !== value))
}

export type Command = {
    label: string,
    arguments: InvokeArgs,
    command: string,
}


export const COMMANDS: Command[] = [
    {
        label: "note",
        arguments: { content: null },
        command: "write_txt"
    },
    {
        label: "open",
        arguments: { path: null },
        command: "open_file"
    },
    {
        label: "delete",
        arguments: { path: null },
        command: "delete_file"
    },
    {
        label: "move file",
        arguments: { source: null, destination: null },
        command: "move_file"
    },
]