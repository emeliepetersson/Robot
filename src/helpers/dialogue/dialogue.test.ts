import { mockDocumentBody } from "../../../mocks/domMocks";
import { sv } from "../language/language.types";
import { setupDialogue } from "./dialogue";

mockDocumentBody();
let button: HTMLButtonElement;
let input: HTMLParagraphElement;

/**
 * Simulate a keyboard event
 * 
 * @param {string} key
 * @returns {void}
 */
const simulateKeyboardEvent = (key: string): void => {
    const keyboardEvent = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keyboardEvent);
};

describe("Dialogue", () => {
    beforeAll(() => {
        button = document.querySelector<HTMLButtonElement>('#dialogue')!;
        input = document.querySelector<HTMLParagraphElement>('.input')!;
        setupDialogue(button);
    })

    afterEach(()=> {
        // This resets the command button text to the default value
        button.innerHTML = sv.commandButton;
    });

    it("should change button text and display description when clicking on dialogue button", () => {
        const buttonText = button.innerHTML;
        expect(buttonText).toBe(sv.commandButton);

        button.click();

        // After button click the button text should change...
        expect(button.innerHTML).toBe(sv.commandButtonDone);
        
        // ...and the description should be displayed
        const description = document.querySelector<HTMLParagraphElement>('#description')!;
        expect(description.innerHTML).toBe(sv.commandsInstructions);
    });

    it('should listen for keyboard input when the dialogue button is clicked', async() => {
        button.click();

        simulateKeyboardEvent('v');

        // Check if the input is updated
        expect(input.innerHTML).toBe('v');
    });

    it('should stop listening for keyboard input when the dialogue button is clicked again', () => {
        button.click();
        button.click();

        simulateKeyboardEvent('h');

        // Check if the input is updated (it should still be empty)
        expect(input.innerHTML).toBe('');
    });

    it('should highlight invalid commands', () => {
        button.click();

        // Simulates a press of the 'x' key (which is not a valid command)
        simulateKeyboardEvent('x');

        // Check if the 'x' is wrapped in a span
        expect(input.innerHTML).toBe('<span>x</span>');
    });

    it('should show a notification if no command are given', () => {
        button.click();
        button.click();

        const notification = document.querySelector<HTMLDivElement>('#user-input')!;
        expect(notification.innerHTML).toBe(sv.commandsError);
    });
    
    it('should remove invalid command when clicking on the backspace key', () => {
        button.click();

        simulateKeyboardEvent('v');
        simulateKeyboardEvent('a');
        simulateKeyboardEvent('Backspace');

        // The input element should only contain the 'v' command
        expect(input.innerHTML).toBe('v');
    });

    it('should remove valid command when clicking on the backspace key', () => {
        button.click();

        simulateKeyboardEvent('g');
        simulateKeyboardEvent('h');
        simulateKeyboardEvent('Backspace');

        // The input element should only contain the 'g' command
        expect(input.innerHTML).toBe('g');
    });


    it('should pass the given commands to the robot', () => {
        button.click();

        simulateKeyboardEvent('v');
        simulateKeyboardEvent('h');
        simulateKeyboardEvent('g');
        simulateKeyboardEvent('a');

        // 'a' should be highlighted as an invalid command
        expect(input.innerHTML).toBe('vhg<span>a</span>');

        button.click();

        // Check if the modal with the given commands is displayed
        const modal = document.querySelector<HTMLDivElement>('.modal')!;
        const messageElement = modal!.querySelector('p');
        expect(modal.style.display).toBe('block');

        // The modal should only contain the valid commands
        expect(messageElement!.innerHTML).toBe('vhg');
    });

    it('should trigger button event when pressing the enter key', () => {
        button.click();

        simulateKeyboardEvent('v');
        simulateKeyboardEvent('h');

        // Make sure the button is focused
        button.focus();
        simulateKeyboardEvent('Enter');

        // Set a timeout in order for the button text to have time to change
        setTimeout(() => {
            // Check if the button text is back to the default value
            expect(button.innerHTML).toBe(sv.commandButton);
        }, 100);
    });
});