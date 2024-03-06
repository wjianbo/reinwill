type MenuGroup = MenuBase & {
    children: [MenuGroup]
}

type CommandGroup = MenuBase & {
    children: [Command]
}

type Command = {
    readonly type: 'command';
    label: string;
    href: string;
}

type Menu = {
    readonly type: 'menu';
    label: string;
    children: Menu[] | Command[]
}

type MenuBase = {
    type: 'group' | 'command';
    name: string
}
