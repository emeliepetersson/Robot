import { mockDocumentBody } from '../../../mocks/domMocks';
import { setupDialogue } from '../dialogue/dialogue';
import { setupLanguageButton, texts } from './language';
import { en, sv } from './language.types';

let languageButton: HTMLButtonElement;

describe('Language', () => {
    beforeEach(() => {
        // Reset the document body
        mockDocumentBody();

        languageButton = document.querySelector<HTMLButtonElement>('#language')!
        setupLanguageButton(languageButton);
    })

    it('should return an object with swedish texts by default', () => {
        expect(texts).toEqual(sv);
    });

    it('should update the command button text correctly if it has been clicked before chaning language', () => {
        const commandButton = document.querySelector<HTMLButtonElement>('#dialogue')!;
        setupDialogue(commandButton);

        commandButton.click();
        expect(commandButton.textContent).toBe(sv.commandButtonDone);

        languageButton.click();
        expect(commandButton.textContent).toBe(en.commandButtonDone);
    });

    it('should change the language of the page when the language-button is clicked', () => {
        languageButton.click();

        // The inital text content of the button is 'English', so it should be changed to 'Svenska'...
        expect(languageButton.textContent).toBe('Svenska');

        // ...and the texts should be updated to english
        const commandsTitle = document.querySelector<HTMLHeadingElement>('.card.commands h2')!;
        const positionCard = document.querySelector<HTMLDivElement>('.card.position')!;
        const positionTitle = positionCard.querySelector<HTMLHeadingElement>('h2')!;
        expect(commandsTitle.textContent).toBe(en.commandsTitle);
        expect(positionTitle.textContent).toBe(en.positionTitle);
    });
});