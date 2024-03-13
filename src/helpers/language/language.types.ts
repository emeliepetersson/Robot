export type Lang = 'Svenska' | 'English';

const sv = {
    commandButton: "Ange kommando",
    commandButtonDone: "Klar",
    commandsTitle: 'Giltiga kommandon:',
    commandsLeft: 'V: Sväng vänster',
    commandsRight: 'H: Sväng höger',
    commandsForward: 'G: Gå framåt',
    commandsInstructions: 'Klicka på tangenterna V, H eller G.',
    commandsError: 'Inga kommandon är angivna!',
    commandsInvalid: 'Ogiltigt kommando!',

    positionTitle: 'Nuvarande position:',
    positionErrorMessage: 'Roberta gick in i väggen!',
    positionDirection: 'Riktning:',

    givenCommands: 'Givna kommandon:',

    go: 'Kör',

    forwardCommand: 'G',
    leftCommand: 'V',
    rightCommand: 'H',

    errorOutsideRoom: "Roberta kan inte gå utanför rummet!",
    errorSetupRobot: "Ett fel uppstod när roboten skulle renderas!",
    errorSetupRoom: "Ett fel uppstod när rummet skulle renderas, testa att byta webbläsare...",
    errorMoveRobot: "Ett fel uppstod när roboten skulle flytta på sig!"
}

const en = {
    commandButton: "Enter command",
    commandButtonDone: "Done",
    commandsTitle: 'Valid commands:',
    commandsLeft: 'L: Turn left',
    commandsRight: 'R: Turn right',
    commandsForward: 'F: Go forward',
    commandsInstructions: 'Click on the keys L, R or F.',
    commandsError: 'No commands are given!',
    commandsInvalid: 'Invalid command!',

    positionTitle: 'Current position:',
    positionErrorMessage: 'Roberta hit the wall!',
    positionDirection: 'Direction:',

    givenCommands: 'Given commands:',

    go: 'Go',

    forwardCommand: 'F',
    leftCommand: 'L',
    rightCommand: 'R',

    errorOutsideRoom: "Roberta can't go outside the room!",
    errorSetupRobot: "An error occurred when the robot was supposed to be rendered!",
    errorSetupRoom: "An error occurred when the room was supposed to be rendered, try changing browser...",
    errorMoveRobot: "An error occurred when the robot was supposed to move!"
}

export { sv, en }