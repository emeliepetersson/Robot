import { mockDocumentBody } from '../test.helper';
import { setupLanguageButton, texts } from './language';
import { sv } from './language.types';

mockDocumentBody();

describe('Language', () => {
    it('should return an object with swedish texts by default', () => {
        expect(texts).toEqual(sv);
    });

    it('should change the language when the button is clicked', () => {
        const button = document.createElement('button');
        button.textContent = 'Svenska';
        setupLanguageButton(button);
        button.click();
        expect(button.textContent).toBe('English');
    });
});