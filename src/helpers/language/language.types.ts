export type Lang = 'Svenska' | 'English';

const sv = {
    commandButton: "Ange kommando",
    commandsTitle: 'Giltiga kommandon:',
    commandsLeft: 'V: Sväng vänster',
    commandsRight: 'H: Sväng höger',
    commandsForward: 'G: Gå framåt',

    positionTitle: 'Nuvarande position:',
    positionErrorMessage: 'Roberta gick in i väggen!',
    positionDirection: 'Riktning: ',
}

const en = {
    commandButton: "Enter command",
    commandsTitle: 'Valid commands:',
    commandsLeft: 'L: Turn left',
    commandsRight: 'R: Turn right',
    commandsForward: 'F: Go forward',

    positionTitle: 'Current position:',
    positionErrorMessage: 'Roberta hit the wall!',
    positionDirection: 'Direction: ',
}

export { sv, en }