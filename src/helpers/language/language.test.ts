import { mockDocumentBody } from '../../../mocks/domMocks';
import { setupDialogue } from '../dialogue/dialogue';
import { setupLanguageButton, texts } from './language';
import { en, sv } from './language.types';

describe('Language', () => {
    beforeEach(()=> {
        // Reset the document body
        mockDocumentBody();
    })

    it('should return an object with swedish texts by default', () => {
        expect(texts).toEqual(sv);
    });

    it('should update the command button text correctly if it is clicked', () => {
        const languageButton = document.querySelector<HTMLButtonElement>('#language')!
        setupLanguageButton(languageButton);

        const commandButton = document.querySelector<HTMLButtonElement>('#dialogue')!;
        setupDialogue(commandButton);

        commandButton.click();
        expect(commandButton.textContent).toBe(sv.commandButtonDone);

        languageButton.click();
        expect(commandButton.textContent).toBe(en.commandButtonDone);
    });

    it('should change the language when the button is clicked', () => {
        const button = document.querySelector<HTMLButtonElement>('#language')!
        setupLanguageButton(button);
        button.click();

        // The inital text content of the button is 'English', so it should be changed to 'Svenska'...
        expect(button.textContent).toBe('Svenska');

        // ...and the texts should be updated to english
        const commandsTitle = document.querySelector<HTMLHeadingElement>('.card.commands h2')!;
        const positionCard = document.querySelector<HTMLDivElement>('.card.position')!;
        const positionTitle = positionCard.querySelector<HTMLHeadingElement>('h2')!;
        expect(commandsTitle.textContent).toBe(en.commandsTitle);
        expect(positionTitle.textContent).toBe(en.positionTitle);
    });
});