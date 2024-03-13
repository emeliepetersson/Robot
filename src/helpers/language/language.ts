import { Lang, en, sv } from "./language.types";

let texts = sv;

/**
 * Add an event listener to the language button in order to change the language
 * 
 * @param {HTMLButtonElement} button 
 * @returns {void}
 */
const setupLanguageButton = (button: HTMLButtonElement): void => {
    
    button.onclick = () => {
        let language = button.textContent as Lang ?? 'Svenska';
        const changeToSwedish = language === 'Svenska';

        // Update the current language and change button text
        texts = changeToSwedish ? sv : en;
        const newButtonText: Lang = changeToSwedish ? 'English' : 'Svenska';
        button.textContent = newButtonText;

        changeCommandsTexts();
        changePositionText();
    };
};

/**
 * Change the texts related to the commands
 * 
 * @returns {void}
 */
const changeCommandsTexts = (): void => {
    const commandsCard = document.querySelector<HTMLDivElement>('.card.commands')!;
    const commandButton = document.querySelector<HTMLButtonElement>('#dialogue')!;
    const commandsTitle = commandsCard.querySelector<HTMLHeadingElement>('h2')!;
    const commandsLeft = commandsCard.querySelector<HTMLLIElement>('li')!;
    const commandsRight = commandsLeft.nextElementSibling!;
    const commandsForward = commandsRight.nextElementSibling!;

    // Since the command button text changes after clicking on it we need to check the current text
    const commandBtnText = commandButton.textContent;
    if(commandBtnText === sv.commandButtonDone || commandBtnText === en.commandButtonDone) commandButton.textContent = texts.commandButtonDone;
    else commandButton.textContent = texts.commandButton;

    commandsTitle.textContent = texts.commandsTitle;
    commandsLeft.textContent = texts.commandsLeft;
    commandsRight.textContent = texts.commandsRight;
    commandsForward.textContent = texts.commandsForward;
}

/**
 * Change the texs related to the position
 * 
 * @returns {void}
 */
const changePositionText = (): void => {
    const positionCard = document.querySelector<HTMLDivElement>('.card.position')!;
    const positionTitle = positionCard.querySelector<HTMLHeadingElement>('h2')!;
    const errorMessage = positionCard.querySelector<HTMLParagraphElement>('.error-message')!;
    const directionTitle = positionCard.querySelector<HTMLParagraphElement>('.direction-title')!;

    positionTitle.textContent = texts.positionTitle;
    errorMessage.textContent = texts.positionErrorMessage;
    directionTitle.textContent = texts.positionDirection;
};

export {
    texts,
    setupLanguageButton
};