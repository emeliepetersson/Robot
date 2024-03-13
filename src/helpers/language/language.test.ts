import { mockDocumentBody } from '../../../mocks/domMocks';
import { setupLanguageButton, texts } from './language';
import { en, sv } from './language.types';

mockDocumentBody();

describe('Language', () => {
    it('should return an object with swedish texts by default', () => {
        expect(texts).toEqual(sv);
    });

    it('should change the language when the button is clicked', () => {
        const button = document.querySelector<HTMLButtonElement>('#language')!
        setupLanguageButton(button);
        button.click();

        // The inital text content of the button is 'English', so it should be changed to 'Svenska'...
        expect(button.textContent).toBe('Svenska');

        // ...and the texts should be updated to english
        const commandsTitle = document.querySelector<HTMLHeadingElement>('.card.commands h2')!;
        expect(commandsTitle.textContent).toBe(en.commandsTitle);
    });
});